import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import Frominput from "@/components/form/Frominput";
import { updateprofile } from "@/api/user";
import { useForm } from "react-hook-form";
import Formuploadimage from "@/components/form/Formuploadimage";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "@/components/schemas/buyerinfo";
const formatDateThai = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
//*
const BuyerInfo = ({ user, setUser }) => {
  // const [user, setUser] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [showmodalimage, setshowModalimage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      DateofBirth: user?.Buyer?.DateofBirth?.split("T")[0] || "",
    },
  });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Loaded user from localStorage:", parsedUser);
      setUser(parsedUser);
      reset({
        DateofBirth: parsedUser?.Buyer?.DateofBirth?.split("T")[0] || "",
      });
    }
  }, []);
  const onSubmit = async (data) => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== "",
        ),
      );
      const updateUser = await updateprofile(user.id, filteredData);
      alert("Update Success");
      setUser(updateUser.user);
      localStorage.setItem("user", JSON.stringify(updateUser.user));
      setshowModal(false);
    } catch (err) {
      console.error("Error update user:", err);
      alert("Server Error");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">โปรไฟล์ผู้ซื้อ</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            {/* Avatar + ชื่อ */}
            <div className="flex items-center space-x-4">
              <img
                src={user?.image}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />

              <div>
                <p className="text-xl font-bold">
                  {user?.First_name} {user?.Last_name}
                </p>
                <p className="text-sm text-gray-600">{user?.Email}</p>
              </div>

              <Formuploadimage
                userId={user.id}
                onUploadSuccess={async (imageData) => {
                  if (!imageData?.url) return alert("ไม่พบ URL รูปภาพ");

                  try {
                    const response = await updateprofile(user.id, {
                      image: imageData.url,
                    });

                    // ✅ รวมข้อมูลเดิมกับใหม่ เพื่อไม่ให้ field อื่นหาย
                    const mergedUser = {
                      ...user, // เก็บของเดิมไว้
                      ...response.user, // ทับเฉพาะ field ที่ backend ส่งมา (image, Buyer)
                      Buyer: {
                        ...user.Buyer,
                        ...response.user.Buyer, // รวมข้อมูลใน Buyer เช่นกัน
                      },
                    };

                    setUser(mergedUser);
                    localStorage.setItem("user", JSON.stringify(mergedUser));
                    alert("อัปโหลดและบันทึกรูปภาพสำเร็จ");
                  } catch (err) {
                    console.error("อัปเดตรูปภาพล้มเหลว:", err);
                    alert("ไม่สามารถอัปเดตรูปได้");
                  }
                }}
              />
            </div>

            {/* ปุ่มแก้ไข */}
            <div>
              <Button className="cursor-pointer" variant="outline" size="sm">
                แก้ไขรูป
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setshowModal(true);
                }}
                className="cursor-pointer"
              >
                <Pencil className="w-4 h-4 mr-2" />
                แก้ไขข้อมูล
              </Button>
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
                <CircleX
                  className="absolute top-4 right-4 cursor-pointer hover:text-black text-gray-500"
                  onClick={() => setshowModal(false)}
                />
                <h1 className="font-bold text-xl text-center mb-2">
                  แก้ไขข้อมูล
                </h1>

                {/* <div className="flex items-center">
                  <Formuploadimage
                    userId={user.id}
                    onUploadSuccess={async (imageData) => {
                      try {
                        const url = imageData?.url;
                        if (!url) {
                          console.error("No image URL found in response");
                          return;
                        }

                        // ส่ง URL ที่อัปโหลดแล้ว ไปบันทึกในฐานข้อมูล
                        const response = await fetch(`/api/users/${user.id}/image`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ image: url }),
                        });

                        if (!response.ok) throw new Error("Failed to update image");

                        const result = await response.json();

                        const updatedUser = {
                          ...user,
                          image: result.image.url, // หรือ url
                        };

                        setUser(updatedUser);
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        alert("อัปโหลดและบันทึกรูปสำเร็จ");

                      } catch (err) {
                        console.error("อัปโหลดรูปหรืออัปเดตฐานข้อมูลล้มเหลว:", err);
                        alert("ไม่สามารถอัปโหลดหรือบันทึกรูปได้");
                      }
                    }}
                  />

                </div> */}
                {/* <div className="flex items-center">

                    <Formuploadimage
                      userId={user.id}
                      onUploadSuccess={async (imageData) => {
                        console.log("image url:", imageData.url);
                        try {
                          const url = imageData?.url;

                          if (!url) {
                            console.error("No image URL found in response");
                            return;
                          }

                          
                          const updatedUser = {
                            ...user,
                            image: url,
                          };

                          
                          setUser(updatedUser);
                          localStorage.setItem("user", JSON.stringify(updatedUser));

                          alert("อัปโหลดสำเร็จ");
                        } catch (err) {
                          console.error("อัปเดตรูปภาพล้มเหลว:", err);
                          alert("ไม่สามารถอัปโหลดรูปได้");
                        }
                      }}
                    />


                  </div> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-first mb-4">
                    <input
                      type="date"
                      value={
                        watch("DateofBirth") ||
                        user?.Buyer?.DateofBirth?.split("T")[0] ||
                        ""
                      }
                      {...register("DateofBirth")}
                      className="input w-full h-10 border p-2 rounded-xl"
                    />
                    {errors.DateofBirth && (
                      <p className="text-red-500 text-sm">
                        {errors.DateofBirth.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Frominput
                      label="First Name"
                      name="First_name"
                      defaultValue={user?.First_name || ""}
                      register={register}
                      error={errors.First_name?.message}
                    />
                    <Frominput
                      label="Last Name"
                      name="Last_name"
                      defaultValue={user?.Last_name || ""}
                      register={register}
                      error={errors.Last_name?.message}
                    />
                    <Frominput
                      type="tel"
                      label="Phone Number"
                      name="Phone"
                      defaultValue={user?.Phone || ""}
                      register={register}
                      error={errors.Phone?.message}
                    />
                    <Frominput
                      label="Email"
                      name="Email"
                      defaultValue={user?.Email || ""}
                      register={register}
                      error={errors.Email?.message}
                    />
                    <Frominput
                      label="Occupation"
                      name="Occupation"
                      defaultValue={user?.Occupation || ""}
                      register={register}
                      error={errors.Occupation?.message}
                    />
                    <Frominput
                      type="number"
                      label="Monthly Income"
                      name="Monthly_Income"
                      defaultValue={user?.Monthly_Income || ""}
                      register={register}
                      error={errors.Monthly_Income?.message}
                    />
                    <Frominput
                      type="number"
                      label="Family Size"
                      name="Family_Size"
                      defaultValue={user?.Family_Size || ""}
                      register={register}
                      error={errors.Family_Size?.message}
                    />
                    <div className="flex flex-col mt-6">
                      <select
                        className="input w-full h-10 border p-2 rounded-xl"
                        {...register("Parking_Needs")}
                      >
                        <option value="">Select Parking Needs</option>
                        <option value="oneCar">1 Car</option>
                        <option value="twoCars">2 Car</option>
                        <option value="Not_required">Not Required</option>
                      </select>
                      {errors.Parking_Needs && (
                        <p className="text-red-500 text-sm">
                          {errors.Parking_Needs?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex felx-col mt-5">
                      <select
                        className="input w-full h-10 border p-2 rounded-xl"
                        {...register("Nearby_Facilities")}
                      >
                        <option value="">Nearby Facilities</option>
                        <option value="School">School</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Mall_Market">Mall/Market</option>
                        <option value="Park_Nature">Park</option>
                      </select>
                    </div>
                    <div className="flex felx-col mt-5">
                      <select
                        {...register("Lifestyle_Preferences")}
                        className="input w-full h-10 border p-2 rounded-xl"
                      >
                        <option value="">Lifestyle Preferences</option>
                        <option value="Work_from_Home">Work from Home</option>
                        <option value="Have_Pets">Have Pets</option>
                        <option value="Need_a_Home_Office">Need Office</option>
                        <option value="Like_Gardening">Like Gardening</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    {...register("Special_Requirements")}
                    placeholder="Special Requirements"
                    className="input w-full p-2 rounded-xl border-2"
                  />
                  <div className="flex flex-col justify-center items-center mt-3">
                    <button
                      type="submit"
                      className="bg-[#2C3E50] w-full text-white rounded-md h-[30px] hover:bg-[#1a252f]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* รายละเอียด */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <p>
              <span className="font-semibold">เบอร์โทร:</span>{" "}
              {user?.Phone || "-"}
            </p>
            <p>
              <span className="font-semibold">วันเกิด:</span>{" "}
              {formatDateThai(user?.Buyer?.DateofBirth)}
            </p>
            <p>
              <span className="font-semibold">อาชีพ:</span>{" "}
              {user?.Buyer?.Occupation || "-"}
            </p>
            <p>
              <span className="font-semibold">รายได้:</span>{" "}
              {user?.Buyer?.Monthly_Income || "-"}
            </p>
            <p>
              <span className="font-semibold">ขนาดครอบครัว:</span>{" "}
              {user?.Buyer?.Family_Size || "-"}
            </p>
            <p>
              <span className="font-semibold">จังหวัดที่สนใจ:</span>{" "}
              {user?.Buyer?.Preferred_Province || "-"}
            </p>
            <p>
              <span className="font-semibold">เขตที่สนใจ:</span>{" "}
              {user?.Buyer?.Preferred_District || "-"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerInfo;

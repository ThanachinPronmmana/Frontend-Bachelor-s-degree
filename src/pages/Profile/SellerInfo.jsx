import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, CircleX } from "lucide-react";
import Frominput from "@/components/form/Frominput";
import Formuploadimage from "@/components/form/Formuploadimage";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateSeller } from "@/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema } from "@/components/schemas/sellerinfo"; // คุณอาจต้องสร้าง schema นี้

const SellerInfo = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sellerSchema),
  });

  useEffect(() => {
    if (user && user.Seller) {
      reset({
        First_name: user.First_name || "",
        Last_name: user.Last_name || "",
        Phone: user.Phone || "",
        National_ID: user.Seller.National_ID || "",
        Company_Name: user.Seller.Company_Name || "",
        RealEstate_License: user.Seller.RealEstate_License || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      );

      const updateUser = await updateSeller(user.id, filteredData);

      const mergedUser = {
        ...user,
        ...updateUser.user,
        Seller: {
          ...user.Seller,
          ...updateUser.user.Seller,
        },
      };

      setUser(mergedUser);
      localStorage.setItem("user", JSON.stringify(mergedUser));
      alert("✅ บันทึกข้อมูลสำเร็จ");
      setShowModal(false);
    } catch (err) {
      console.error("Error updating seller:", err);
      alert("❌ เกิดข้อผิดพลาด");
    }
  };

  if (!user) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">โปรไฟล์ผู้ขาย</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={user?.image || "https://via.placeholder.com/80"}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <p className="text-xl font-bold">
                  {user.First_name} {user.Last_name}
                </p>
                <p className="text-sm text-gray-600">{user.Email}</p>
              </div>

              <Formuploadimage
                userId={user.id}
                onUploadSuccess={async (imageData) => {
                  if (!imageData?.url) return alert("ไม่พบ URL รูปภาพ");

                  try {
                    const updated = await updateSeller(user.id, {
                      image: imageData.url,
                    });

                    const mergedUser = {
                      ...user,
                      ...updated.user,
                      Seller: {
                        ...user.Seller,
                        ...updated.user.Seller,
                      },
                    };

                    setUser(mergedUser);
                    localStorage.setItem("user", JSON.stringify(mergedUser));
                    alert("📸 รูปภาพอัปโหลดและบันทึกแล้ว");
                  } catch (err) {
                    console.error("รูปภาพอัปเดตล้มเหลว:", err);
                    alert("ไม่สามารถบันทึกรูปได้");
                  }
                }}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                แก้ไขรูป
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                แก้ไขข้อมูล
              </Button>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
                <CircleX
                  className="absolute top-4 right-4 cursor-pointer hover:text-black text-gray-500"
                  onClick={() => setShowModal(false)}
                />
                <h1 className="font-bold text-xl text-center mb-4">
                  แก้ไขข้อมูลผู้ขาย
                </h1>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-2 gap-4"
                >
                  <Frominput
                    label="First Name"
                    name="First_name"
                    defaultValue={user.First_name || ""}
                    register={register}
                    error={errors.First_name?.message}
                  />
                  <Frominput
                    label="Last name"
                    name="Last_name"
                    defaultValue={user.Last_name || ""}
                    register={register}
                    error={errors.Last_name?.message}
                  />
                  <Frominput
                    label="Phone"
                    name="Phone"
                    defaultValue={user.Phone || ""}
                    register={register}
                    error={errors.Phone?.message}
                  />
                  <Frominput
                    label="National ID"
                    name="National_ID"
                    defaultValue={user.Seller?.National_ID || ""}
                    register={register}
                    error={errors.National_ID?.message}
                  />
                  <Frominput
                    label="Company Name"
                    name="Company_Name"
                    defaultValue={user.Seller?.Company_Name || ""}
                    register={register}
                    error={errors.Company_Name?.message}
                  />
                  <Frominput
                    label="RealEstate License"
                    name="RealEstate_License"
                    defaultValue={user.Seller?.RealEstate_License || ""}
                    register={register}
                    error={errors.RealEstate_License?.message}
                  />

                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="bg-[#2C3E50] w-full text-white rounded-md h-[40px] hover:bg-[#1a252f]"
                    >
                      บันทึก
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
              {user.Phone || "-"}
            </p>
            <p>
              <span className="font-semibold">เลขบัตรประชาชน:</span>{" "}
              {user.Seller?.National_ID || "-"}
            </p>
            <p>
              <span className="font-semibold">บริษัท:</span>{" "}
              {user.Seller?.Company_Name || "-"}
            </p>
            <p>
              <span className="font-semibold">ใบตัวแทนนายหน้า:</span>{" "}
              {user.Seller?.RealEstate_License || "-"}
            </p>
            <p>
              <span className="font-semibold">สถานะบัญชี:</span>{" "}
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${
                  user.Status === "APPROVED"
                    ? "bg-green-500"
                    : user.Status === "PENDING"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {user.Status === "APPROVED"
                  ? "ยืนยันแล้ว"
                  : user.Status === "PENDING"
                  ? "รอดำเนินการ"
                  : "ถูกปฏิเสธ"}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerInfo;

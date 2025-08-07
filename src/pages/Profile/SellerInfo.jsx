import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Frominput from "@/components/form/Frominput";
import Formuploadimage from "@/components/form/Formuploadimage";

const SellerInfo = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user && user.Seller) {
      reset({
        Phone: user.Phone || "",
        National_ID: user.Seller.National_ID || "",
        Company_Name: user.Seller.Company_Name || "",
        RealEstate_License: user.Seller.RealEstate_License || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const updateData = {
        Phone: data.Phone,
        Seller: {
          National_ID: data.National_ID,
          Company_Name: data.Company_Name,
          RealEstate_License: data.RealEstate_License,
        },
      };

      const res = await axios.patch(
        `http://localhost:8200/api/profileseller/${user.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // อัปเดตสถานะในหน้าจอทันที
      setUser((prev) => ({
        ...prev,
        Phone: data.Phone,
        Seller: {
          ...prev.Seller,
          National_ID: data.National_ID,
          Company_Name: data.Company_Name,
          RealEstate_License: data.RealEstate_License,
        },
      }));

      setIsEditing(false);
      alert("✅ บันทึกข้อมูลสำเร็จ");
    } catch (err) {
      console.error("Error updating seller:", err);
      alert("❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  if (!user) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">โปรไฟล์ผู้ขาย</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            {/* รูปภาพ + ชื่อ */}
            <div className="flex items-center space-x-4">
              <img
                src={user.image || "https://via.placeholder.com/80"}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <p className="text-xl font-bold">
                  {user.First_name} {user.Last_name}
                </p>
                <p className="text-sm text-gray-600">{user.Email}</p>
              </div>
            </div>

            {/* ปุ่มแก้ไข */}
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit(onSubmit)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  บันทึก
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  ยกเลิก
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                แก้ไขข้อมูล
              </Button>
            )}
          </div>

          {/* ฟอร์มอัปโหลดรูป */}
          <Formuploadimage userId={user.id} type="seller" setUser={setUser} />

          {/* รายละเอียด */}
          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mt-6">
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
          ) : (
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mt-6">
              <Frominput
                label="เบอร์โทร"
                name="Phone"
                defaultValue={user.Phone || ""}
                register={register}
                error={errors.Phone?.message}
              />
              <Frominput
                label="เลขบัตรประชาชน"
                name="National_ID"
                defaultValue={user.Seller?.National_ID || ""}
                register={register}
                error={errors.National_ID?.message}
              />
              <Frominput
                label="บริษัท"
                name="Company_Name"
                defaultValue={user.Seller?.Company_Name || ""}
                register={register}
                error={errors.Company_Name?.message}
              />
              <Frominput
                label="ใบตัวแทนนายหน้า"
                name="RealEstate_License"
                defaultValue={user.Seller?.RealEstate_License || ""}
                register={register}
                error={errors.RealEstate_License?.message}
              />
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerInfo;

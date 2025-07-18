import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

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

const BuyerInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Loaded user from localStorage:", parsedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">โปรไฟล์ผู้ซื้อ</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            {/* Avatar + ชื่อ */}
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/80"
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <p className="text-xl font-bold">
                  {user?.First_name} {user?.Last_name}
                </p>
                <p className="text-sm text-gray-600">{user?.Email}</p>
              </div>
            </div>

            {/* ปุ่มแก้ไข */}
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              แก้ไขข้อมูล
            </Button>
          </div>

          {/* รายละเอียด */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <p>
              <span className="font-semibold">เบอร์โทร:</span> {user?.Phone || "-"}
            </p>
            <p>
              <span className="font-semibold">วันเกิด:</span> {formatDateThai(user?.Buyer?.DateofBirth)}
            </p>
            <p>
              <span className="font-semibold">อาชีพ:</span> {user?.Buyer?.Occaaption || "-"}
            </p>
            <p>
              <span className="font-semibold">รายได้:</span> {user?.Buyer?.Monthly_Income || "-"}
            </p>
            <p>
              <span className="font-semibold">ขนาดครอบครัว:</span> {user?.Buyer?.Family_Size || "-"}
            </p>
            <p>
              <span className="font-semibold">จังหวัดที่สนใจ:</span> {user?.Buyer?.Preferred_Province || "-"}
            </p>
            <p>
              <span className="font-semibold">เขตที่สนใจ:</span> {user?.Buyer?.Preferred_District || "-"}
            </p>
          </div>

          {/* Debug raw date (ลบออกได้เมื่อมั่นใจแล้ว) */}
          <p className="mt-4 text-xs text-gray-400">
            Raw DateofBirth: {user?.Buyer?.DateofBirth || "ไม่มีข้อมูล"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerInfo;

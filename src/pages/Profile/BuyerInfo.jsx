import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const BuyerInfo = () => {
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
                <p className="text-xl font-bold">สมหญิง ใจดี</p>
                <p className="text-sm text-gray-600">somying@example.com</p>
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
              <span className="font-semibold">เบอร์โทร:</span> 089-876-5432
            </p>
            <p>
              <span className="font-semibold">อายุ:</span> 35 ปี
            </p>
            <p>
              <span className="font-semibold">อาชีพ:</span> พนักงานบริษัท
            </p>
            <p>
              <span className="font-semibold">ที่อยู่:</span> 123/4 ถนนสุขุมวิท กทม.
            </p>
            <p>
              <span className="font-semibold">สถานะบัญชี:</span>{" "}
              <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                ยืนยันแล้ว
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerInfo;

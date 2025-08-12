import PostLayout from "@/layouts/PostLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Edit, ImageIcon } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

// ตัวอย่างข้อมูลทดสอบ (ในจริงควรใช้ข้อมูลจาก Context หรือ State ของฟอร์ม)
const dummyData = {
  title: "บ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว",
  type: "บ้านเดี่ยว",
  bedroom: 3,
  bathroom: 2,
  price: 3500000,
  deposit: 50000,
  province: "กรุงเทพมหานคร",
  district: "ห้วยขวาง",
  sellerName: "นายสมชาย บ้านดี",
  phone: "0812345678",
  images: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/160",
  ],
};

const PostConfirm = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    // ส่งข้อมูลจริงไปหลังบ้านที่นี่
    setShowConfirm(false);
    navigate("/");
  };

  return (
    <PostLayout currentStep={6}>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto w-10 h-10 text-primary" />
            <CardTitle className="text-2xl font-semibold mt-2">
              ยืนยันข้อมูล
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              กรุณาตรวจสอบข้อมูลของคุณก่อนโพสต์
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* หมวด: ข้อมูลประกาศ */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">ข้อมูลประกาศ</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/seller/post-for-sale/title")}
                >
                  <Edit className="w-4 h-4 mr-1" /> แก้ไข
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b py-1">
                  <span>หัวข้อ</span>
                  <span>{dummyData.title}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>ประเภท</span>
                  <span>{dummyData.type}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>ห้องนอน</span>
                  <span>{dummyData.bedroom}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>ห้องน้ำ</span>
                  <span>{dummyData.bathroom}</span>
                </div>
              </div>
            </div>

            {/* หมวด: ที่ตั้ง */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">ที่ตั้ง</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/seller/post-for-sale/location")}
                >
                  <Edit className="w-4 h-4 mr-1" /> แก้ไข
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b py-1">
                  <span>จังหวัด</span>
                  <span>{dummyData.province}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>อำเภอ/เขต</span>
                  <span>{dummyData.district}</span>
                </div>
              </div>
            </div>

            {/* หมวด: ราคา */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">ราคา</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/seller/post-for-sale/price")}
                >
                  <Edit className="w-4 h-4 mr-1" /> แก้ไข
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b py-1">
                  <span>ราคาขาย</span>
                  <span>{dummyData.price.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>เงินมัดจำ</span>
                  <span>{dummyData.deposit.toLocaleString()} บาท</span>
                </div>
              </div>
            </div>

            {/* หมวด: ผู้ขาย */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">ข้อมูลผู้ขาย</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/seller/post-for-sale/inform")}
                >
                  <Edit className="w-4 h-4 mr-1" /> แก้ไข
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b py-1">
                  <span>ชื่อผู้ขาย</span>
                  <span>{dummyData.sellerName}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>เบอร์โทร</span>
                  <span>{dummyData.phone}</span>
                </div>
              </div>
            </div>

            {/* หมวด: รูปภาพ */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">รูปภาพประกาศ</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/seller/post-for-sale/upload")}
                >
                  <Edit className="w-4 h-4 mr-1" /> แก้ไข
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {dummyData.images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-square border rounded overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {dummyData.images.length === 0 && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> ไม่มีรูปภาพ
                </div>
              )}
            </div>

            {/* ปุ่มยืนยัน */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/seller/post-for-sale/upload")}
              >
                ย้อนกลับ
              </Button>
              <Button onClick={() => setShowConfirm(true)}>
                ยืนยันการโพสต์
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal ยืนยัน */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการโพสต์ประกาศ</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            คุณแน่ใจหรือไม่ว่าต้องการโพสต์ประกาศนี้?
            หลังจากโพสต์แล้วคุณยังสามารถแก้ไขได้ภายหลัง
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              โพสต์ประกาศ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PostLayout>
  );
};

export default PostConfirm;

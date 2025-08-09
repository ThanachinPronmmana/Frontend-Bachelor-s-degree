import PostLayout from "@/layouts/PostLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const dummyData = {
  title: "บ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว",
  province: "กรุงเทพมหานคร",
  district: "ห้วยขวาง",
  type: "บ้านเดี่ยว",
  bedroom: 3,
  bathroom: 2,
  price: 3500000,
  deposit: 50000,
  sellerName: "นายสมชาย บ้านดี",
  phone: "0812345678",
};

const PostConfirm = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // ส่งข้อมูลจริงไปหลังบ้านที่นี่
    navigate("/");
  };

  return (
    <PostLayout currentStep={6}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <CheckCircle className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">ยืนยันข้อมูล</h2>
              <p className="text-muted-foreground text-sm">
                กรุณาตรวจสอบข้อมูลของคุณก่อนโพสต์
              </p>
            </div>

            <div className="space-y-2">
              {Object.entries(dummyData).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b py-2">
                  <span className="font-medium capitalize">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/post-for-sale/upload")}
              >
                ย้อนกลับ
              </Button>
              <Button onClick={handleSubmit}>ยืนยันการโพสต์</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostConfirm;

// PostConfirm.jsx

import PostLayout from "@/layouts/PostLayout";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Edit, ImageIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import axios from "axios";

// กำหนด URL ของ API
const API_URL = "http://localhost:8200";

const PostConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

  // สถานะสำหรับเก็บข้อมูลโพสต์และสถานะการโหลด
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึง postId จาก state ที่ส่งมาจากหน้า upload
  const postId = location.state?.postId;

  // ใช้ useEffect เพื่อดึงข้อมูลโพสต์เมื่อ component โหลด
  useEffect(() => {
    if (!postId) {
      setError("ไม่พบ ID โพสต์ กรุณาลองใหม่");
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/propertypost/${postId}`
        );
        setPostData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch post data:", err);
        setError("ไม่สามารถดึงข้อมูลโพสต์ได้");
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // dependency array เพื่อให้ useEffect ทำงานเมื่อ postId เปลี่ยน

  const handleSubmit = () => {
    // โค้ดสำหรับการจัดการหลังบ้านหากจำเป็น
    setShowConfirm(false);
    navigate("/");
  };

  // แสดงสถานะการโหลด
  if (isLoading) {
    return (
      <PostLayout currentStep={6}>
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="ml-4">กำลังโหลดข้อมูล...</p>
        </div>
      </PostLayout>
    );
  }

  // แสดงสถานะ error
  if (error) {
    return (
      <PostLayout currentStep={6}>
        <div className="flex justify-center items-center h-96 text-red-600">
          <p>{error}</p>
        </div>
      </PostLayout>
    );
  }

  // ป้องกันการแสดงผลถ้าไม่มีข้อมูล
  if (!postData) {
    return null;
  }

  // ใช้ postData ในการแสดงผลแทน dummyData
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
                  <span>{postData.Property_Name}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>ประเภท</span>
                  <span>{postData.Category?.Property_type}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>ห้องนอน</span>
                  <span>{postData.Bedrooms}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>ห้องน้ำ</span>
                  <span>{postData.Bathroom}</span>
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
                  <span>{postData.Province}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>อำเภอ/เขต</span>
                  <span>{postData.District}</span>
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
                  <span>{postData.Price?.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>เงินมัดจำ</span>
                  <span>{postData.Deposit_Amount?.toLocaleString()} บาท</span>
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
                  <span>{postData.Name}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>เบอร์โทร</span>
                  <span>{postData.Phone}</span>
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
                {postData.Image && postData.Image.length > 0 ? (
                  postData.Image.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-square border rounded overflow-hidden"
                    >
                      <img
                        src={img.secure_url || img.url}
                        alt={`preview-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> ไม่มีรูปภาพ
                  </div>
                )}
              </div>
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

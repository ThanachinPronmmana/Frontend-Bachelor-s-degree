import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PostLayout from "@/layouts/PostLayout";
import { useNavigate } from "react-router-dom";
import { Trash2, Image as ImageIcon, CircleX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 10;
const API_URL = "http://localhost:8200";
function PostUpload() {
  const navigate = useNavigate();
  const form = useFormContext();

  const [error, setError] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = form.watch("images") || [];

  const handleAddImages = useCallback(
    (files) => {
      for (const file of files) {
        if (file.size > MAX_IMAGE_SIZE) {
          setError(`ไฟล์รูปภาพ "${file.name}" ขนาดเกิน 5MB`);
          return false;
        }
      }
      setError("");

      const newFiles = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const updatedImages = [...images, ...newFiles];
      if (updatedImages.length > MAX_IMAGES) {
        setError(`เพิ่มรูปได้สูงสุด ${MAX_IMAGES} รูป`);
        return false;
      }
      form.setValue("images", updatedImages, { shouldValidate: true });
      return true;
    },
    [form, images]
  );
  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    const updatedImages = images.filter((_, i) => i !== index);
    form.setValue("images", updatedImages);
  };
  const handleDropImages = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleAddImages(files);
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  // 👇 2. แก้ไขฟังก์ชัน handleNext ทั้งหมด
  const handleNext = async () => {
    if (images.length === 0) {
      setError("กรุณาอัปโหลดรูปภาพบ้านอย่างน้อย 1 รูป");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const allData = form.getValues();
    const formData = new FormData();

    // เพิ่มไฟล์รูปภาพเข้าไปใน FormData
    allData.images.forEach((imgObject) => {
      formData.append("images", imgObject.file);
    });

    // เพิ่มข้อมูลอื่นๆ ทั้งหมดเข้าไปใน FormData
    for (const key in allData) {
      if (key === "images") continue; // ข้ามไฟล์รูปเพราะเพิ่มไปแล้ว

      const value = allData[key];
      if (value === null || value === undefined) {
        formData.append(key, "");
      } else if (Array.isArray(value)) {
        // สำหรับ Array, ให้เพิ่มเข้าไปทีละตัวด้วย key เดียวกัน
        // Backend (multer) จะรวบรวมให้เป็น Array เอง
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    }

    try {
      // ดึง userId จาก localStorage ตามที่คุณต้องการ
      // **หมายเหตุ:** ควรตรวจสอบให้แน่ใจว่า key "user" ใน localStorage เก็บเฉพาะ ID จริงๆ
      const userId = localStorage.getItem("id");
      console.log(userId);
      if (!userId) {
        throw new Error("ไม่พบ User ID กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      }

      // ใช้ axios.post เพื่อส่งข้อมูล
      const response = await axios.post(
        `${API_URL}/api/propertypost/${userId}`, // Endpoint ที่รับ userId จาก params
        formData,
        {
          headers: {
            // ไม่ต้องกำหนด 'Content-Type': 'multipart/form-data'
            // axios จะจัดการให้โดยอัตโนมัติเมื่อ body เป็น FormData
          },
        }
      );

      console.log("สร้างโพสต์สำเร็จ:", response.data);
      form.reset(); // (Optional) ล้างข้อมูลในฟอร์มหลังจากส่งสำเร็จ
      navigate("/seller/post-for-sale/confirm");
    } catch (apiError) {
      // axios จะโยน error ออกมาถ้า status ไม่ใช่ 2xx
      // เราสามารถดึงข้อความ error จาก response ของ server ได้
      const message =
        apiError.response?.data?.message ||
        apiError.message ||
        "เกิดข้อผิดพลาดในการสร้างโพสต์";
      setError(message);
      console.error("API Error:", apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostLayout currentStep={5}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <ImageIcon className="mx-auto w-10 h-10 text-primary" />

              <h2 className="text-2xl font-semibold mt-2">อัปโหลดรูปภาพ</h2>

              <p className="text-muted-foreground text-sm mb-2">
                เลือกรูปภาพอสังหาริมทรัพย์ของคุณ (สูงสุด {MAX_IMAGES} รูป,
                ขนาดไม่เกิน 5MB ต่อไฟล์)
              </p>

              <div
                onDrop={handleDropImages}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-primary rounded-md p-6 cursor-pointer hover:bg-primary/10"
                onClick={() => setShowImageModal(true)}
              >
                ลากและวางรูปภาพที่นี่ หรือคลิกเพื่อเลือกไฟล์
              </div>

              <p className="text-sm mt-2 text-muted-foreground">
                อัปโหลดแล้ว {images.length} / {MAX_IMAGES} รูป
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-32 object-cover rounded"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>

                  <p className="text-xs text-center mt-1 truncate">
                    {(img.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-red-600 font-semibold text-center">{error}</p>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/seller/post-for-sale/inform")}
              >
                ย้อนกลับ
              </Button>

              <Button onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting ? "กำลังอัปโหลด..." : "ถัดไป"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
            <CircleX
              className="absolute top-4 right-4 cursor-pointer hover:text-black text-gray-500"
              onClick={() => setShowImageModal(false)}
            />
            <h2 className="text-xl font-bold mb-4 text-center">เพิ่มรูปภาพ</h2>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (handleAddImages(e.target.files)) {
                  setShowImageModal(false);
                }
              }}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>
        </div>
      )}
    </PostLayout>
  );
}

export default PostUpload;

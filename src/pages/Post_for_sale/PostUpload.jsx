// src/pages/Post_for_sale/PostUpload.jsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import PostLayout from "@/layouts/PostLayout";
import { useNavigate } from "react-router-dom";
import { Trash2, Image as ImageIcon, CircleX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 5;

function PostUpload() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const navigate = useNavigate();

  const handleAddFiles = useCallback(
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

      if (images.length + newFiles.length > MAX_IMAGES) {
        setError(`เพิ่มรูปได้สูงสุด ${MAX_IMAGES} รูป`);
        return false;
      }

      setImages((prev) => [...prev, ...newFiles]);
      return true;
    },
    [images.length]
  );

  const handleRemove = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDropImages = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) handleAddFiles(files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleNext = () => {
    if (images.length === 0) {
      setError("กรุณาอัปโหลดรูปภาพบ้านอย่างน้อย 1 รูป");
      return;
    }
    setError("");
    navigate("/seller/post-for-sale/confirm");
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
              <p
                onDrop={handleDropImages}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-primary rounded-md p-6 cursor-pointer hover:bg-primary/10"
                onClick={() => setShowImageModal(true)}
              >
                ลากและวางรูปภาพที่นี่ หรือคลิกเพื่อเลือกไฟล์
              </p>
              <Button className="mt-2" onClick={() => setShowImageModal(true)}>
                เพิ่มรูปภาพ
              </Button>
              <p className="text-sm mt-1 text-muted-foreground">
                อัปโหลดแล้ว {images.length} / {MAX_IMAGES} รูป
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  >
                    <Trash2 size={16} />
                  </button>
                  <p className="text-xs text-center mt-1 truncate">
                    {(img.file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-red-600 font-semibold mt-4 text-center">
                {error}
              </p>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/seller/post-for-sale/inform")}
              >
                ย้อนกลับ
              </Button>
              <Button onClick={handleNext}>ถัดไป</Button>
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
                if (handleAddFiles(e.target.files)) setShowImageModal(false);
              }}
            />
          </div>
        </div>
      )}
    </PostLayout>
  );
}

export default PostUpload;

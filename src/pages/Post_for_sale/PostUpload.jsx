import { useState } from "react";
import { Button } from "@/components/ui/button";
import PostLayout from "@/layouts/PostLayout";
import { useNavigate } from "react-router-dom";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PostUpload = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...fileURLs]);
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    navigate("/post-for-sale/confirm");
  };

  return (
    <PostLayout currentStep={5}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <ImageIcon className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">อัปโหลดรูปภาพ</h2>
              <p className="text-muted-foreground text-sm">
                เลือกรูปภาพอสังหาริมทรัพย์ของคุณ (อัปโหลดได้หลายรูป)
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />

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
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/post-for-sale/inform")}
              >
                ย้อนกลับ
              </Button>
              <Button onClick={handleNext}>ถัดไป</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostUpload;

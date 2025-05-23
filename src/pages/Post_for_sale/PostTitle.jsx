import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "@/context/FormContext";

const PostTitle = () => {
  const { formData, updateFormData } = useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/postlocation");
  };

  return (
    <div className="min-h-screen bg-[#34495E] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-400 w-full max-w-2xl text-center relative">
        <h1 className="text-2xl font-semibold mb-6">Title</h1>
        <input
          type="text"
          className="w-full p-3 rounded shadow mb-4 border"
          placeholder="กรอกชื่อประกาศของคุณ"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
        />

        <div className="text-left text-sm text-gray-700 mt-2">
          <p className="mb-1 font-semibold">Example</p>
          <p className="mb-1">
            “ ขายบ้านเดี่ยว 2 ชั้น ใกล้ BTS อ่อนนุช พร้อมอยู่ ราคาพิเศษ! ”
          </p>
          <p className="mb-3">
            “ ให้เช่าคอนโดหรู วิวแม่น้ำ ชั้นสูง 2 ห้องนอน ใจกลางเมือง ”
          </p>
          <p className="font-semibold">คำแนะนำให้ใช้อย่างไร:</p>
          <p>“ แนะนำให้ระบุ ประเภทอสังหาฯ + จุดเด่น + ทำเล ”</p>
        </div>

        <Button
          className="mt-6 w-full bg-[#35495E] hover:bg-[#2c3e50] text-white"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PostTitle;

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageUploadSchema } from "../schemas/image";

const Formuploadimage = ({ userId, onUploadSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      console.log("ไม่มีรูปภาพใหม่ ไม่ต้องอัปโหลด");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("userId", userId);

    try {
      setUploading(true);
      const result = await axios.post(
        `http://localhost:8200/api/image/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (onUploadSuccess) {
        onUploadSuccess(result.data.image);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("อัปโหลดล้มเหลว");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", [file]); // ตั้งค่าใน react-hook-form
      handleSubmit(onSubmit)(); // เรียก submit ทันที
    }
  };

  return (
    <form className="space-y-4">
      <label className="font-semibold block mb-1">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={handleFileChange}
        disabled={uploading}
        className="cursor-pointer"
      />
      {uploading && <p className="text-sm text-gray-500">กำลังอัปโหลด...</p>}
    </form>
  );
};

export default Formuploadimage;

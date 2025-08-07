import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Formuploadimage = ({ userId, type = "buyer", setUser }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      console.log("⛔ ไม่มีรูปภาพใหม่ ไม่ต้องอัปโหลด");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const result = await axios.post(
        `http://localhost:8200/api/image/${userId}`, // <== ตรงนี้ให้ตรงกับ backend จริง
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (setUser && result.data.image) {
        setUser((prev) => ({
          ...prev,
          image: result.data.image,
        }));
      }

      alert("✅ อัปโหลดรูปภาพสำเร็จ");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ อัปโหลดล้มเหลว");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", [file]);
      handleSubmit(onSubmit)(); // Submit ทันทีหลังเลือกรูป
    }
  };

  return (
    <form className="space-y-4 mt-4">
      <label className="font-semibold block mb-1">เปลี่ยนรูปโปรไฟล์</label>
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

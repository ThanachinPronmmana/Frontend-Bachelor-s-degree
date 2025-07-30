import { updateImage } from "@/api/user";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Formuploadimage = ({ userId, onUploadSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

    const result = await axios.post(`http://localhost:8200/api/image/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    
    if (onUploadSuccess) {
      onUploadSuccess(result.data.image);  
    }

    reset();
  } catch (err) {
    
  } finally {
    setUploading(false);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-semibold block mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={(e) => console.log("File selected:", e.target.files)}
          className="cursor-pointer"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-3"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default Formuploadimage;

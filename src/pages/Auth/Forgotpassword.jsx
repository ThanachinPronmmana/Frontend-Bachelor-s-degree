import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotpassword } from "@/api/auth"; // <-- เรียกใช้ API

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await forgotpassword(data); // ส่ง email ไปยัง backend
      setSent(true); // แสดงว่า success แล้ว
      alert(res.message || "Reset link sent to your email.");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">ลืมรหัสผ่าน</h1>
        {sent ? (
          <p className="text-green-600">
            ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-700 mb-2">อีเมล</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            {errors.Email && (
              <p className="text-red-500 mb-2">{errors.Email.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

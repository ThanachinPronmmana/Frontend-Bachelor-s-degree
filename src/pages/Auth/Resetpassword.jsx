import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ แก้ตรงนี้
import { resetpassword } from "@/api/auth";

const Resetpassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!token) {
      alert("Token not found or expired.");
      return;
    }

    try {
      const res = await resetpassword({ token, Password: data.Password });
      alert(res.message || "Password reset successfully");
      navigate("/Login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          ตั้งรหัสผ่านใหม่
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-1 text-gray-700">รหัสผ่านใหม่</label>
          <input
            type="password"
            {...register("Password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.Password && (
            <p className="text-red-500 text-sm">{errors.Password.message}</p>
          )}

          <label className="block mb-1 text-gray-700">ยืนยันรหัสผ่านใหม่</label>
          <input
            type="password"
            {...register("ConfirmPassword", {
              validate: (value) =>
                value === watch("Password") || "Passwords do not match",
            })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.ConfirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.ConfirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            ตั้งรหัสผ่านใหม่
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;

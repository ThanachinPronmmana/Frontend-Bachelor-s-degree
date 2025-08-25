import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
const Login = () => {
  const navigate = useNavigate();
  const { authUser, revalidateUser } = useAuth();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();


  useEffect(() => {
    if (authUser) {
      if (authUser.userType === "Seller") navigate("/seller");
      else if (authUser.userType === "Buyer") navigate("/buyer");
    }
  }, [authUser, navigate]);

  const onSubmit = async (formData) => {
    setServerError("");
    setIsSubmitting(true);
    try {
      await login(formData)
      await revalidateUser();

    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed, please try again.");
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#818283] min-h-screen flex items-center justify-center">
      <div className="bg-white w-[900px] h-[550px] rounded-xl shadow-xl flex overflow-hidden">
        {/* รูปด้านซ้าย */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <img
            src="https://i.pinimg.com/736x/5b/b4/5d/5bb45dd8bf2c2ecba1bbda8c656a2018.jpg"
            alt="house"
            className="w-[95%] object-contain"
          />
        </div>

        {/* ฟอร์มด้านขวา */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <img src="/hand-icon.svg" alt="logo" className="w-12 h-12 mb-2" />
            <h1 className="text-xl font-semibold text-[#2C3E50]">
              Yuu Yenn Property
            </h1>
          </div>

          {serverError && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-1 text-gray-600">
                Email
              </label>
              <input
                {...register("Email", { required: "Email is required" })}
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {errors.Email && (
                <p className="text-red-500 text-sm">{errors.Email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm mb-1 text-gray-600">
                Password
              </label>
              <input
                {...register("Password", { required: "Password is required" })}
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {errors.Password && (
                <p className="text-red-500 text-sm">{errors.Password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1a252f] transition cursor-pointer flex items-center justify-center h-[40px] disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-[#2C3E50] cursor-pointer"
                onClick={() => navigate("/forgot")}
              >
                Forgot password?
              </a>
            </div>

            <Link to="/register">
              <div className="text-center mt-4 text-sm">
                Don’t have an account?{" "}
                <span className="text-[#2C3E50] font-medium cursor-pointer">
                  Sign up now
                </span>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

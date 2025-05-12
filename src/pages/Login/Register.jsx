import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState("Buyer");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // คุณอาจจะเพิ่ม validation ก่อน navigate ได้ตรงนี้

    if (userType === "Buyer") {
      navigate("/Register_buyer");
    } else {
      navigate("/Register_seller"); // แก้ให้ตรงกับหน้าสำหรับ seller ของคุณ
    }
  };

  return (
    <div className="relative min-h-screen bg-[#2C3E50] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/5b/b4/5d/5bb45dd8bf2c2ecba1bbda8c656a2018.jpg')",
        }}
      ></div>

      {/* White overlay blur */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-md w-[500px] shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="/hand-icon.svg" alt="logo" className="w-14 h-14 mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">Yuu Yenn Property</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">User Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Buyer"
                  checked={userType === "Buyer"}
                  onChange={() => setUserType("Buyer")}
                />
                <span>Buyer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Seller"
                  checked={userType === "Seller"}
                  onChange={() => setUserType("Seller")}
                />
                <span>Seller</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1a252f] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

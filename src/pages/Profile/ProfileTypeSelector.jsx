import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileTypeSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20">
      <h1 className="text-2xl font-semibold mb-10 text-gray-800">
        Select Profile Type
      </h1>
      <div className="flex gap-16">
        {/* Buyer Card */}
        <div
          onClick={() => navigate("/profile/buyer")}
          className="bg-[#2c3e50] text-white w-40 h-60 rounded-lg flex items-center justify-center text-lg cursor-pointer hover:bg-[#1f2e3a] transition"
        >
          Buyer
        </div>

        {/* Seller Card */}
        <div
          onClick={() => navigate("/profile/seller")}
          className="bg-[#2c3e50] text-white w-40 h-60 rounded-lg flex items-center justify-center text-lg cursor-pointer hover:bg-[#1f2e3a] transition"
        >
          Seller
        </div>
      </div>
    </div>
  );
};

export default ProfileTypeSelector;

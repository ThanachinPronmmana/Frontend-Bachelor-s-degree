import React, { useState } from "react";
import { Link } from "react-router";

const Register_seller = () => {
  const [formData, setFormData] = useState({
    nationalId: "",
    companyName: "",
    licenseNumber: "",
    nationalIdFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen bg-[#2C3E50] flex items-center justify-center overflow-hidden">
      {/* พื้นหลังรูปภาพ */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/5b/b4/5d/5bb45dd8bf2c2ecba1bbda8c656a2018.jpg')",
        }}
      ></div>

      {/* White overlay blur */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-md w-[400px] shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="/hand-icon.svg" alt="logo" className="w-12 h-12 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Yuu Yenn Property
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">National ID</label>
            <input
              type="text"
              name="nationalId"
              placeholder="X-XXXX-XXXXX-XX-X"
              value={formData.nationalId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md "
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">
              Company Name (Optional)
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">
              Real Estate Agent License Number (Optional)
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Upload National ID</label>
            <input
              type="file"
              name="nationalIdFile"
              onChange={handleChange}
              className="w-full cursor-pointer font-bold"
            />
          </div>
          <Link to="/">
            <button
              type="submit"
              className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1a252f]"
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register_seller;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLine, FaFacebook } from "react-icons/fa";
import { useForm } from "@/context/FormContext";

const PostInform = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm();

  const handleChange = (field, value) => {
    updateFormData(field, value);
  };

  const handleNext = () => {
    navigate("/post-for-sale/upload");
  };

  const handleBack = () => {
    navigate("/post-for-sale/price");
  };

  return (
    <div className="min-h-screen bg-[#34495E] flex flex-col items-center">
      <div className="bg-white mt-10 px-10 py-6 rounded-lg shadow-md w-[700px]">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {[
            "Title",
            "Details",
            "Price & Terms",
            "Seller Information",
            "Upload Photos",
            "Confirmation",
          ].map((label, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index === 3 ? "bg-gray-800" : "bg-gray-300"}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Name / Phone */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1 text-black">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-black">
              Phone number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-black">E-mail</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>

        {/* Social Media */}
        <div className="mb-4 text-black">
          <label className="block text-sm mb-2">Social Media</label>

          {/* Line */}
          <div className="mb-2">
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={formData.useLine}
                onChange={() => handleChange("useLine", !formData.useLine)}
                className="mr-2"
              />
              <FaLine className="text-green-500 mr-2" />
              Line
            </label>
            {formData.useLine && (
              <input
                type="text"
                placeholder="Enter Line ID"
                value={formData.line}
                onChange={(e) => handleChange("line", e.target.value)}
                className="w-full p-2 border rounded shadow-sm"
              />
            )}
          </div>

          {/* Facebook */}
          <div>
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={formData.useFacebook}
                onChange={() =>
                  handleChange("useFacebook", !formData.useFacebook)
                }
                className="mr-2"
              />
              <FaFacebook className="text-blue-600 mr-2" />
              Facebook
            </label>
            {formData.useFacebook && (
              <input
                type="text"
                placeholder="Enter Facebook profile link"
                value={formData.facebook}
                onChange={(e) => handleChange("facebook", e.target.value)}
                className="w-full p-2 border rounded shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-[#95A5A6] text-white rounded hover:opacity-90"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#34495E] text-white rounded hover:bg-[#2c3e50]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInform;

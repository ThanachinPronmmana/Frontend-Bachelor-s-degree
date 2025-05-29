import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/context/FormContext";

const PostConfirm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm(); // << ใช้ context

  const handleSubmit = () => {
    if (!formData.confirm1 || !formData.confirm2) {
      alert("Please confirm all required items.");
      return;
    }

    // ส่ง formData ไปยัง backend (ถ้ามี)
    alert("Your post has been submitted!");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/post-for-sale/upload");
  };

  return (
    <div className="min-h-screen bg-[#34495E] flex flex-col items-center">
      <div className="bg-white mt-10 px-10 py-6 rounded-lg shadow-md w-[700px]">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {["Title", "Details", "Price & Terms", "Seller Information", "Upload Photos", "Confirmation"].map((label, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index === 5 ? "bg-gray-800" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Confirm Checkboxes */}
        <div className="text-black space-y-4 mb-8 text-sm">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeInfo"
              className="mt-1 mr-2"
              checked={formData.confirm1}
              onChange={(e) => updateFormData("confirm1", e.target.checked)}
            />
            <label htmlFor="agreeInfo">
              I confirm that the information provided is correct.
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeReview"
              className="mt-1 mr-2"
              checked={formData.confirm2}
              onChange={(e) => updateFormData("confirm2", e.target.checked)}
            />
            <label htmlFor="agreeReview">
              I understand that the advertisement will be subject to review before being posted on the website.
            </label>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-[#95A5A6] text-white rounded hover:opacity-90"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.confirm1 || !formData.confirm2}
            className={`px-6 py-2 rounded-md text-white w-40 ${
              formData.confirm1 && formData.confirm2
                ? "bg-[#34495E] hover:bg-[#2c3e50]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostConfirm;

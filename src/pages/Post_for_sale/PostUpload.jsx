import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const PostUpload = () => {
  const navigate = useNavigate();

  const [housePhotos, setHousePhotos] = useState([]);
  const [documents, setDocuments] = useState([]);

  const handleHousePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setHousePhotos((prev) => [...prev, ...files]);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments((prev) => [...prev, ...files]);
  };

  const handleNext = () => {
    if (housePhotos.length < 5) {
      alert("Please upload at least 5 house photos.");
      return;
    }
    // Proceed to confirmation page
    navigate("/postconfirm");
  };

  const handleBack = () => {
    navigate("/postinform");
  };

  return (
    <div className="min-h-screen bg-[#34495E] flex flex-col items-center">
      <div className="bg-white mt-10 px-10 py-6 rounded-lg shadow-md w-[700px]">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {["Title", "Details", "Price & Terms", "Seller Information", "Upload Photos", "Confirmation"].map((label, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index === 4 ? "bg-gray-800" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Upload house photos */}
        <div className="mb-6 text-center text-black">
          <p className="mb-2 font-medium">Upload house photos <br />(minimum 5 photos)</p>
          <label className="cursor-pointer bg-gray-300 text-black py-2 px-6 rounded-md inline-flex items-center gap-2">
            <FaUpload />
            Upload
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleHousePhotoUpload}
              hidden
            />
          </label>
          <p className="mt-2 text-sm text-gray-600">
            {housePhotos.length} photo(s) selected
          </p>
        </div>

        {/* Upload documents */}
        <div className="mb-6 text-center text-black">
          <p className="mb-2 font-medium">Upload homeowner verification documents</p>
          <label className="cursor-pointer bg-gray-300 text-black py-2 px-6 rounded-md inline-flex items-center gap-2">
            <FaUpload />
            Upload
            <input
              type="file"
              multiple
              onChange={handleDocumentUpload}
              hidden
            />
          </label>
          <p className="mt-2 text-sm text-gray-600">
            {documents.length} document(s) selected
          </p>
        </div>

        {/* Navigation buttons */}
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

export default PostUpload;

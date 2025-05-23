import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const navigate = useNavigate();

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedLandmarks, setSelectedLandmarks] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [parking, setParking] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const toggleSelection = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const propertyTypes = [
    "Condo", "House", "Townhouse", "Apartment", "Land",
    "Office", "Warehouse", "Hotel", "Factory", "Commercial Building"
  ];

  const landmarks = ["BTS / MRT", "School", "Hospital", "Mall/Market", "Park"];
  const amenities = ["Swimming Pool", "Fitness Center", "Co-working Space", "Pet Friendly", "Children's Playground"];

  const handleBack = () => navigate("/postlocation");
  const handleNext = () => navigate("/postprice");

  return (
    <div className="min-h-screen bg-[#34495E] flex flex-col items-center">
      <div className="bg-white mt-10 px-10 py-6 rounded-lg shadow-md w-[700px]">
        <div className="flex justify-between mb-6">
          {["Location", "Details", "Price & Terms", "Seller Information", "Upload Photos", "Confirmation"].map((label, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index === 1 ? "bg-gray-800" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Property Type */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">Property Type<span className="text-red-500">*</span></label>
          <div className="grid grid-cols-5 gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleSelection(type, selectedPropertyTypes, setSelectedPropertyTypes)}
                className={`border rounded px-2 py-1 text-sm ${selectedPropertyTypes.includes(type) ? "bg-[#34495E] text-white" : "bg-white"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-1 text-sm text-black">Area Size (sqm)</label>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={areaSize}
              onChange={(e) => setAreaSize(e.target.value)}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-black">Total Rooms</label>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-black">Year Built</label>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>

         {/* Bedrooms */}
<div>
  <label className="block mb-1 text-sm text-black">Bedrooms</label>
  <div className="flex items-center gap-2">
    <button
      onClick={() => setBedrooms((prev) => Math.max(Number(prev) - 1, 0))}
      className="px-3 py-1 border rounded text-black bg-gray-100 hover:bg-gray-200"
    >
      -
    </button>
    <input
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      value={bedrooms}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) setBedrooms(val);
      }}
      className="w-16 text-center p-2 border rounded shadow-sm"
    />
    <button
      onClick={() => setBedrooms((prev) => Number(prev) + 1)}
      className="px-3 py-1 border rounded text-black bg-gray-100 hover:bg-gray-200"
    >
      +
    </button>
  </div>
</div>

{/* Bathrooms */}
<div>
  <label className="block mb-1 text-sm text-black">Bathrooms</label>
  <div className="flex items-center gap-2">
    <button
      onClick={() => setBathrooms((prev) => Math.max(Number(prev) - 1, 0))}
      className="px-3 py-1 border rounded text-black bg-gray-100 hover:bg-gray-200"
    >
      -
    </button>
    <input
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      value={bathrooms}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) setBathrooms(val);
      }}
      className="w-16 text-center p-2 border rounded shadow-sm"
    />
    <button
      onClick={() => setBathrooms((prev) => Number(prev) + 1)}
      className="px-3 py-1 border rounded text-black bg-gray-100 hover:bg-gray-200"
    >
      +
    </button>
  </div>
</div>


        </div>

        {/* Nearby Landmarks */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">Nearby Landmarks</label>
          <div className="flex flex-wrap gap-2">
            {landmarks.map((item) => (
              <button
                key={item}
                onClick={() => toggleSelection(item, selectedLandmarks, setSelectedLandmarks)}
                className={`border rounded px-3 py-1 text-sm ${selectedLandmarks.includes(item) ? "bg-[#34495E] text-white" : "bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Amenities */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">Additional Amenities</label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((item) => (
              <button
                key={item}
                onClick={() => toggleSelection(item, selectedAmenities, setSelectedAmenities)}
                className={`border rounded px-3 py-1 text-sm ${selectedAmenities.includes(item) ? "bg-[#34495E] text-white" : "bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Parking Space */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">Parking Space</label>
          <select
            value={parking}
            onChange={(e) => setParking(e.target.value)}
            className="w-full p-2 border rounded shadow-sm"
          >
            <option value="">Select parking option</option>
            <option value="1">1 Space</option>
            <option value="2">2 Spaces</option>
            <option value="3">3+ Spaces</option>
          </select>
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

export default PostDetail;

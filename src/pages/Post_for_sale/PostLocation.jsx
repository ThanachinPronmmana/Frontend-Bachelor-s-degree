import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/context/FormContext";

const PostLocation = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm(); // ✅ ใช้งาน FormContext

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  const [allAmphures, setAllAmphures] = useState([]);
  const [allTambons, setAllTambons] = useState([]);

  // ✅ โหลดข้อมูลจังหวัด/อำเภอ/ตำบล
  useEffect(() => {
    const fetchData = async () => {
      const [provinceRes, amphureRes, tambonRes] = await Promise.all([
        fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"),
        fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"),
        fetch("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"),
      ]);

      const [provinceData, amphureData, tambonData] = await Promise.all([
        provinceRes.json(),
        amphureRes.json(),
        tambonRes.json(),
      ]);

      setProvinces(provinceData);
      setAllAmphures(amphureData);
      setAllTambons(tambonData);
    };

    fetchData();
  }, []);

  // ✅ เปลี่ยนอำเภอเมื่อเลือกจังหวัด
  useEffect(() => {
    if (formData.province) {
      const province = provinces.find((p) => p.name_th === formData.province);
      const filteredAmphures = allAmphures.filter((a) => a.province_id === province?.id);
      setAmphures(filteredAmphures);
      updateFormData("district", ""); // เคลียร์ค่าถ้าเปลี่ยน
      updateFormData("subDistrict", "");
      setTambons([]);
    }
  }, [formData.province, provinces, allAmphures]);

  // ✅ เปลี่ยนตำบลเมื่อเลือกอำเภอ
  useEffect(() => {
    if (formData.district) {
      const amphure = amphures.find((a) => a.name_th === formData.district);
      const filteredTambons = allTambons.filter((t) => t.amphure_id === amphure?.id);
      setTambons(filteredTambons);
      updateFormData("subDistrict", "");
    }
  }, [formData.district, amphures, allTambons]);

  const handleNext = () => { 
    navigate("/post-for-sale/detail"); 
  };

  const handleBack = () => {
    navigate("/post-for-sale/title");
  };

  return (
    <div className="min-h-screen bg-[#34495E] flex flex-col items-center">
      <div className="bg-white mt-10 px-10 py-6 rounded-lg shadow-md w-[700px]">
        {/* Steps */}
        <div className="flex justify-between mb-6">
          {["Location", "Details", "Price & Terms", "Seller Information", "Upload Photos", "Confirmation"].map((label, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index === 0 ? "bg-gray-800" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
    <div className="flex flex-col gap-4 mb-6">
      {/* Province */}
      <div>
       <label className="block mb-1 text-sm text-black">
          Province <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.province}
          onChange={(e) => updateFormData("province", e.target.value)}
          className="w-full p-2 border rounded shadow-sm"
        >
          <option value="">Select province</option>
          {provinces.map((item) => (
            <option key={item.id} value={item.name_th}>
              {item.name_th}
        </option>
      ))}
    </select>
  </div>

  {/* District */}
  <div>
    <label className="block mb-1 text-sm text-black">
      District <span className="text-red-500">*</span>
    </label>
    <select
      value={formData.district}
      onChange={(e) => updateFormData("district", e.target.value)}
      className="w-full p-2 border rounded shadow-sm"
      disabled={!amphures.length}
    >
      <option value="">Select district</option>
      {amphures.map((item) => (
        <option key={item.id} value={item.name_th}>
          {item.name_th}
        </option>
      ))}
    </select>
  </div>

  {/* Subdistrict */}
  <div>
    <label className="block mb-1 text-sm text-black">
      Subdistrict <span className="text-red-500">*</span>
    </label>
    <select
      value={formData.subDistrict}
      onChange={(e) => updateFormData("subDistrict", e.target.value)}
      className="w-full p-2 border rounded shadow-sm"
      disabled={!tambons.length}
    >
      <option value="">Select subdistrict</option>
      {tambons.map((item) => (
        <option key={item.id} value={item.name_th}>
          {item.name_th}
        </option>
      ))}
    </select>
  </div>

  {/* Address */}
  <div>
    <label className="block mb-1 text-sm text-black">Address</label>
    <input
      type="text"
      value={formData.address}
      onChange={(e) => updateFormData("address", e.target.value)}
      className="w-full p-2 border rounded shadow-sm"
    />
  </div>
</div>


        {/* Buttons */}
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

export default PostLocation;

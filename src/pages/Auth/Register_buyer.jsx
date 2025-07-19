import { useState } from "react";
import { Link } from "react-router";

const Register_buyer = () => {
  const [formData, setFormData] = useState({
    age: "",
    occupation: "",
    salary: "",
    familySize: 1,
    financialReadiness: "down_payment",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFamilySize = (delta) => {
    setFormData((prev) => ({
      ...prev,
      familySize: Math.max(1, prev.familySize + delta),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // or handle navigation
  };

  return (
    <div className="relative min-h-screen bg-[#2C3E50] flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/5b/b4/5d/5bb45dd8bf2c2ecba1bbda8c656a2018.jpg')", // ใส่ลิงก์ภาพของคุณเอง
        }}
      ></div>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-white p-6 rounded-md shadow-lg w-[500px]">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span>ℹ️</span> Basic Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
              placeholder="DD/MM/YY"
            />
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
              placeholder="Job"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            >
              <option value="">Select Salary</option>
              <option value="<20K">&lt; 20K</option>
              <option value="20K-50K">20K - 50K</option>
              <option value="50K-100K">50K - 100K</option>
              <option value=">100K">&gt; 100K</option>
            </select>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleFamilySize(-1)}
                className="px-2 py-1 bg-gray-200 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                name="familySize"
                value={formData.familySize}
                readOnly
                className="w-12 text-center border-t border-b"
              />
              <button
                type="button"
                onClick={() => handleFamilySize(1)}
                className="px-2 py-1 bg-gray-200 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Financial Readiness</label>
            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="financialReadiness"
                  value="down_payment"
                  checked={formData.financialReadiness === "down_payment"}
                  onChange={handleChange}
                />
                I have a down payment
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="financialReadiness"
                  value="mortgage"
                  checked={formData.financialReadiness === "mortgage"}
                  onChange={handleChange}
                />
                I plan to apply for a mortgage
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="financialReadiness"
                  value="both"
                  checked={formData.financialReadiness === "both"}
                  onChange={handleChange}
                />
                Both
              </label>
            </div>
          </div>
          <Link to="/Register_buyer2">
          <button
            type="submit"
            className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1a252f] transition"
          >
            Next
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register_buyer;

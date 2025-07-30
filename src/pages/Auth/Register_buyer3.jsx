import { useState } from "react";
import { Link } from "react-router";

const Register_buyer3 = () => {
  const [formData, setFormData] = useState({
    lifestyle: [],
    accessibility: [],
    special: "",
  });

  const toggleCheckbox = (group, value) => {
    setFormData((prev) => {
      const current = prev[group];
      return {
        ...prev,
        [group]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#2C3E50] flex items-center justify-center">
      <div className="relative bg-white w-[600px] rounded-md shadow-lg flex flex-col items-center py-10 px-8">
        <img src="/hand-icon.svg" alt="icon" className="w-10 h-10 mb-2" />
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Yuu Yenn Property
        </h2>

        <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-6">
          {/* Lifestyle Habits */}
          <div>
            <label className="block mb-2 font-medium text-sm">
              Lifestyle Habits
            </label>
            {[
              "Work from Home",
              "Have Pets",
              "Need a Home Office",
              "Like Gardening",
            ].map((habit) => (
              <label key={habit} className="block text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.lifestyle.includes(habit)}
                  onChange={() => toggleCheckbox("lifestyle", habit)}
                />
                {habit}
              </label>
            ))}
          </div>

          {/* Accessibility Needs */}
          <div>
            <label className="block mb-2 font-medium text-sm">
              Health & Accessibility Needs
            </label>
            {[
              "No stairs",
              "Wheelchair-friendly bathroom",
              "Quiet neighborhood",
            ].map((need) => (
              <label key={need} className="block text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.accessibility.includes(need)}
                  onChange={() => toggleCheckbox("accessibility", need)}
                />
                {need}
              </label>
            ))}
          </div>

          {/* Special Requirements */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-sm">
              Special Requirements
            </label>
            <input
              type="text"
              placeholder="..."
              className="w-full border px-3 py-2 rounded"
              value={formData.special}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, special: e.target.value }))
              }
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-6">
            <button type="button" className="bg-gray-200 px-4 py-2 rounded">
              Back
            </button>
            <Link to="/">
              <button
                type="submit"
                className="bg-[#2C3E50] text-white px-6 py-2 rounded hover:bg-[#1a252f]"
              >
                Submit
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register_buyer3;

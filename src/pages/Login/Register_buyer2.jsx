import { useEffect, useState } from "react";
import { Link } from "react-router";

const Register_buyer2 = () => {
  const [formData, setFormData] = useState({
    provinces: [],
    districts: [],
    parking: "",
    mustHaves: [],
    facilities: [],
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Fetch provinces
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setFormData((prev) => ({
      ...prev,
      provinces: [selectedProvince],
      districts: [],
    }));

    // Fetch districts
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const selectedProvinceId = provinces.find(
          (p) => p.name_th === selectedProvince
        )?.id;
        const filteredDistricts = data.filter(
          (d) => d.province_id === selectedProvinceId
        );
        setDistricts(filteredDistricts);
      });
  };

  const handleCheckboxChange = (group, value) => {
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

  return (
    <div className="min-h-screen bg-[#2C3E50] flex items-center justify-center">
      <div className="relative bg-white w-[700px] rounded-md shadow-lg flex flex-col items-center py-10 px-8">
        <img src="/hand-icon.svg" alt="icon" className="w-10 h-10 mb-2" />
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Yuu Yenn Property</h2>

        <form className="grid grid-cols-2 gap-6 w-full">
          {/* Province */}
          <div>
            <label className="block mb-1 font-medium text-sm">Province</label>
            <select
              name="provinces"
              onChange={handleProvinceChange}
              className="w-full border rounded px-3 py-2"
              value={formData.provinces[0] || ""}
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name_th}>
                  {province.name_th}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block mb-1 font-medium text-sm">District</label>
            <select
              name="districts"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  districts: [e.target.value],
                }))
              }
              className="w-full border rounded px-3 py-2"
              value={formData.districts[0] || ""}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name_th}>
                  {district.name_th}
                </option>
              ))}
            </select>
          </div>

          {/* Must-Haves */}
          <div>
            <label className="block mb-2 font-medium text-sm">Nearby Must-Haves</label>
            {["BTS / MRT", "School", "Hospital", "Mall / Market", "Park / Nature"].map(
              (item) => (
                <label key={item} className="block text-sm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("mustHaves", item)}
                    checked={formData.mustHaves.includes(item)}
                    className="mr-2"
                  />
                  {item}
                </label>
              )
            )}
          </div>

          {/* Parking */}
          <div>
            <label className="block mb-2 font-medium text-sm">Parking Requirement</label>
            {["1 Car", "2 Cars", "Not required"].map((option) => (
              <label key={option} className="block text-sm">
                <input
                  type="radio"
                  name="parking"
                  value={option}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, parking: e.target.value }))
                  }
                  checked={formData.parking === option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Facilities */}
          <div>
            <label className="block mb-2 font-medium text-sm">Desired Facilities</label>
            {["Swimming Pool", "Fitness Center", "Co-working Space", "Pet Friendly"].map(
              (item) => (
                <label key={item} className="block text-sm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("facilities", item)}
                    checked={formData.facilities.includes(item)}
                    className="mr-2"
                  />
                  {item}
                </label>
              )
            )}
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-between mt-6 w-full px-4">
          <Link to="/Register_buyer">
            <button className="bg-gray-200 px-4 py-2 rounded">Back</button>
          </Link>
          <Link to="/Register_buyer3">
            <button className="bg-[#2C3E50] text-white px-6 py-2 rounded hover:bg-[#1a252f]">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register_buyer2;

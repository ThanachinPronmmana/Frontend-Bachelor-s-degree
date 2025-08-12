import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate, data } from "react-router-dom";
import { verifyandregister } from "@/api/auth";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
    )
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setValue("Preferred_Province", selectedProvince);
    setValue("Preferred_District", "");

    const selectedProvinceId = provinces.find(
      (p) => p.name_th === selectedProvince,
    )?.id;

    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json",
    ).then((res) =>
      res.json().then((data) => {
        const filtered = data.filter(
          (d) => d.province_id === selectedProvinceId,
        );
        setDistricts(filtered);
      }),
    );
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        token,
        ...data,
        Status: userType === "Seller" ? "PENDING" : undefined,
      };

      const res = await verifyandregister(payload);
      alert(res.message || "Verified successfully");
      navigate("/Login");
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Complete Your Registration
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full border p-2 rounded mt-1 mb-2"
          >
            <option value="">Select Type</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>

        {/* Buyer Form */}
        {userType === "Buyer" && (
          <>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              {...register("DateofBirth", { required: true })}
              className="input w-full border p-2 rounded mb-2"
            />
            {errors.DateOfBirth && (
              <p className="text-red-500">Date of birth is required</p>
            )}

            <input
              {...register("Occupation", { required: true })}
              placeholder="Occupation"
              className="input w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              {...register("Monthly_Income", { required: true })}
              placeholder="Monthly Income"
              className="input w-full border p-2 rounded mb-2"
            />
            {errors.Monthly_Income && (
              <p className="text-red-500">{errors.Monthly_Income.message}</p>
            )}
            <input
              type="number"
              {...register("Family_Size", { required: true })}
              placeholder="Family Size"
              className="input w-full border p-2 rounded mb-2"
            />
            {errors.Family_Size && (
              <p className="text-red-500">{errors.Family_Size.message}</p>
            )}

            <label className="block mb-1">Preferred Province</label>
            <select
              {...register("Preferred_Province", { required: true })}
              className="input w-full border p-2 rounded mb-2"
              onChange={handleProvinceChange}
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name_th}>
                  {province.name_th}
                </option>
              ))}
            </select>
            {errors.Preferred_Province && (
              <p className="text-red-500">Province is required</p>
            )}

            <label className="block mb-1">Preferred District</label>
            <select
              {...register("Preferred_District", { required: true })}
              className="input w-full border p-2 rounded mb-2"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name_th}>
                  {district.name_th}
                </option>
              ))}
            </select>
            {errors.Preferred_District && (
              <p className="text-red-500">District is required</p>
            )}

            <select
              {...register("Parking_Needs", { required: true })}
              className="input w-full border p-2 rounded mb-2"
            >
              <option value="">Select Parking Needs</option>
              <option value="oneCar">1 Car</option>
              <option value="twoCars">2 Cars</option>
              <option value="Not_required">Not Required</option>
            </select>

            <select
              {...register("Nearby_Facilities", { required: true })}
              className="input w-full border p-2 rounded mb-2"
            >
              <option value="">Nearby Facilities</option>
              <option value="School">School</option>
              <option value="Hospital">Hospital</option>
              <option value="Mall_Market">Mall/Market</option>
              <option value="Park_Nature">Park</option>
            </select>

            <select
              {...register("Lifestyle_Preferences", { required: true })}
              className="input w-full border p-2 rounded mb-2"
            >
              <option value="">Lifestyle Preferences</option>
              <option value="Work_from_Home">Work from Home</option>
              <option value="Have_Pets">Have Pets</option>
              <option value="Need_a_Home_Office">Need Office</option>
              <option value="Like_Gardening">Like Gardening</option>
            </select>

            <textarea
              {...register("Special_Requirements")}
              placeholder="Special Requirements"
              className="input w-full border p-2 rounded mb-2"
            />
          </>
        )}

        {/* Seller Form */}
        {userType === "Seller" && (
          <>
            <input
              {...register("National_ID", { required: true })}
              placeholder="National ID"
              className="input w-full border p-2 rounded mb-2"
            />
            <input
              {...register("Company_Name")}
              placeholder="Company Name"
              className="input w-full border p-2 rounded mb-2"
            />
            <input
              {...register("RealEstate_License")}
              placeholder="Real Estate License"
              className="input w-full border p-2 rounded mb-2"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1a252f] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;

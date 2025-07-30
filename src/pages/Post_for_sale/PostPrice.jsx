import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/context/FormContext";

const PostPrice = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm();

  const handleExpenseChange = (field) => {
    updateFormData("expenses", {
      ...formData.expenses,
      [field]: !formData.expenses?.[field],
    });
  };

  const handleNext = () => {
    navigate("/post-for-sale/inform");
  };

  const handleBack = () => {
    navigate("/post-for-sale/detail");
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
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index === 2 ? "bg-gray-800" : "bg-gray-300"}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Sale or Rent */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">
            Do you want to sell or rent?
          </label>
          <div className="flex gap-6">
            {["Sell", "Rent"].map((type) => (
              <label key={type} className="text-black">
                <input
                  type="radio"
                  value={type}
                  checked={formData.saleType === type}
                  onChange={(e) => {
                    updateFormData("saleType", e.target.value);
                    updateFormData("installmentType", "");
                    updateFormData("repaymentPeriod", "");
                    updateFormData("interest", "");
                    updateFormData("amount", "");
                  }}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* For Sell */}
        {formData.saleType === "Sell" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-black">
              Specify the amount (numbers only)
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.amount || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) updateFormData("amount", val);
              }}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>
        )}

        {/* For Rent */}
        {formData.saleType === "Rent" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-black">
              Select installment method
            </label>
            <div className="flex flex-col gap-2 text-black">
              {[
                "Installment directly to the owner",
                "Installment via bank",
              ].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="installment"
                    value={option}
                    checked={formData.installmentType === option}
                    onChange={(e) =>
                      updateFormData("installmentType", e.target.value)
                    }
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* If Directly to Owner */}
            {formData.installmentType ===
              "Installment directly to the owner" && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block mb-1 text-sm text-black">
                    Specify the repayment period (months)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.repaymentPeriod || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val))
                        updateFormData("repaymentPeriod", val);
                    }}
                    className="w-full p-2 border rounded shadow-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm text-black">
                    Interest rate (%)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    value={formData.interest || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*\.?\d*$/.test(val))
                        updateFormData("interest", val);
                    }}
                    className="w-full p-2 border rounded shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other expenses */}
        <div className="mb-8">
          <label className="block mb-2 text-sm text-black">
            Other related expenses
          </label>
          <div className="flex flex-col gap-2 text-black">
            <label>
              <input
                type="checkbox"
                checked={formData.expenses?.transfer || false}
                onChange={() => handleExpenseChange("transfer")}
                className="mr-2"
              />
              Ownership transfer fee
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.expenses?.insurance || false}
                onChange={() => handleExpenseChange("insurance")}
                className="mr-2"
              />
              House insurance fee
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.expenses?.common || false}
                onChange={() => handleExpenseChange("common")}
                className="mr-2"
              />
              Common area fee
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

export default PostPrice;

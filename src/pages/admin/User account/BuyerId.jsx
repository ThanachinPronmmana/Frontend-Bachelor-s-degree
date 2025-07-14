// pages/admin/UserAccount/BuyerId.jsx
import { useState } from "react";

const BuyerId = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [buyers, setBuyers] = useState([
    {
      id: "B001",
      fullName: "Somchai Prasert",
      email: "somchai@example.com",
      phone: "081-234-5678",
      age: 35,
      occupation: "Engineer",
      income: "50,000",
      familySize: 4,
      readiness: "High",
      province: "Bangkok",
      propertyType: "บ้านเดี่ยว",
      dateRegistered: "2025-07-01",
    },
    {
      id: "B002",
      fullName: "Nattaya Meesuk",
      email: "nattaya@example.com",
      phone: "089-876-5432",
      age: 29,
      occupation: "Teacher",
      income: "30,000",
      familySize: 2,
      readiness: "Medium",
      province: "Chiang Mai",
      propertyType: "คอนโด",
      dateRegistered: "2025-07-10",
    },
    // เพิ่มข้อมูล mock ได้ตามต้องการ
  ]);

  const filteredBuyers = buyers.filter(
    (b) =>
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">Buyer ID Table</div>

      <input
        type="text"
        placeholder="Search by name, email or province..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded w-full max-w-sm mb-4"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-2">Buyer ID</th>
              <th className="p-2">Full Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Age</th>
              <th className="p-2">Occupation</th>
              <th className="p-2">Income</th>
              <th className="p-2">Family Size</th>
              <th className="p-2">Readiness</th>
              <th className="p-2">Province</th>
              <th className="p-2">Property Type</th>
              <th className="p-2">Date Registered</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.length === 0 ? (
              <tr>
                <td colSpan="13" className="p-4 text-center text-gray-500">
                  No buyers found.
                </td>
              </tr>
            ) : (
              filteredBuyers.map((buyer) => (
                <tr
                  key={buyer.id}
                  className="border-t border-gray-200 text-sm hover:bg-gray-50"
                >
                  <td className="p-2">{buyer.id}</td>
                  <td className="p-2">{buyer.fullName}</td>
                  <td className="p-2">{buyer.email}</td>
                  <td className="p-2">{buyer.phone}</td>
                  <td className="p-2">{buyer.age}</td>
                  <td className="p-2">{buyer.occupation}</td>
                  <td className="p-2">{buyer.income}</td>
                  <td className="p-2">{buyer.familySize}</td>
                  <td className="p-2">{buyer.readiness}</td>
                  <td className="p-2">{buyer.province}</td>
                  <td className="p-2">{buyer.propertyType}</td>
                  <td className="p-2">{buyer.dateRegistered}</td>
                  <td className="p-2 text-center">
                    <button className="text-blue-600 hover:underline text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerId;
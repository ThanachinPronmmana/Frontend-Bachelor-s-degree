import { useState } from "react";

const VerificationSeller = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sellers = [
    {
      id: "S001",
      name: "สมชาย มหาดไทย",
      email: "somchai@email.com",
      phone: "089-999-1234",
      citizenId: "1234567890123",
      company: "SM Property",
      license: "A-23456",
      document: "ใบอนุญาตขาย.pdf",
    },
    {
      id: "S002",
      name: "สุภาพร ใจดี",
      email: "supaporn@email.com",
      phone: "082-222-4567",
      citizenId: "9876543210987",
      company: "HappyHome",
      license: "B-78901",
      document: "happyhome_doc.pdf",
    },
  ];

  const filteredSellers = sellers.filter((s) =>
    Object.values(s).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">ตรวจสอบผู้ขายที่รอการอนุมัติ</div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 ค้นหาด้วยชื่อ, อีเมล, เบอร์, บริษัท..."
          className="px-3 py-2 border rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">ชื่อ</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">เบอร์</th>
              <th className="px-4 py-2 text-left">เลขบัตร ปชช.</th>
              <th className="px-4 py-2 text-left">บริษัท</th>
              <th className="px-4 py-2 text-left">ใบอนุญาต</th>
              <th className="px-4 py-2 text-left">เอกสาร</th>
              <th className="px-4 py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {filteredSellers.map((seller) => (
              <tr key={seller.id} className="border-b">
                <td className="px-4 py-2">{seller.id}</td>
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2">{seller.email}</td>
                <td className="px-4 py-2">{seller.phone}</td>
                <td className="px-4 py-2">{seller.citizenId}</td>
                <td className="px-4 py-2">{seller.company}</td>
                <td className="px-4 py-2">{seller.license}</td>
                <td className="px-4 py-2 underline text-blue-600 hover:text-blue-800 cursor-pointer">
                  {seller.document}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                    ✅ อนุมัติ
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    ❌ ปฏิเสธ
                  </button>
                </td>
              </tr>
            ))}
            {filteredSellers.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-400 py-4">
                  ไม่พบข้อมูลที่ตรงกับคำค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationSeller;

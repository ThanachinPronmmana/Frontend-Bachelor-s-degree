import { useState } from "react";

const VerifiedSeller = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const verifiedSellers = [
    {
      id: "S010",
      name: "วรชัย จิตดี",
      email: "worachai@email.com",
      phone: "081-234-5678",
      citizenId: "1103700123456",
      company: "VR Homes",
      license: "L-00987",
      document: "ใบอนุญาต.pdf",
    },
    {
      id: "S011",
      name: "พัชรี ศรีบุญ",
      email: "patcharee@email.com",
      phone: "086-789-1234",
      citizenId: "3101700123001",
      company: "Patcharee Property",
      license: "L-12345",
      document: "เอกสารทะเบียนบริษัท.pdf",
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];

  const filteredSellers = verifiedSellers.filter((s) =>
    Object.values(s).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ผู้ขายที่ผ่านการอนุมัติแล้ว</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 ค้นหาด้วยชื่อ, อีเมล, บริษัท, ใบอนุญาต..."
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
              </tr>
            ))}
            {filteredSellers.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-4">
                  ไม่พบข้อมูลผู้ขายที่ตรงกับคำค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifiedSeller;

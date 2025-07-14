import { useState } from "react";

const RejectSeller = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const rejectedSellers = [
    {
      id: "S015",
      name: "ธีรภัทร กุลโชติ",
      email: "teerapat@email.com",
      phone: "091-555-2323",
      citizenId: "1103700111999",
      company: "TP Property",
      license: "L-45321",
      document: "ใบอนุญาตหมดอายุ.pdf",
      reason: "ใบอนุญาตหมดอายุ / ข้อมูลไม่ตรงกับทะเบียนบริษัท",
    },
    {
      id: "S016",
      name: "พิมพ์นารา สุขเกษม",
      email: "pim@email.com",
      phone: "087-321-4567",
      citizenId: "3101700123888",
      company: "Nara Living",
      license: "L-10001",
      document: "ทะเบียนบริษัทไม่ชัดเจน.pdf",
      reason: "เอกสารทะเบียนบริษัทไม่ชัดเจน",
    },
    // เพิ่มข้อมูลเพิ่มเติมได้
  ];

  const filteredSellers = rejectedSellers.filter((seller) =>
    Object.values(seller).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ผู้ขายที่ถูกปฏิเสธ</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 ค้นหาด้วยชื่อ, อีเมล, บริษัท, เหตุผล..."
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
              <th className="px-4 py-2 text-left">เหตุผลที่ปฏิเสธ</th>
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
                <td className="px-4 py-2 text-red-600 font-medium">{seller.reason}</td>
              </tr>
            ))}
            {filteredSellers.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-400 py-4">
                  ไม่พบข้อมูลผู้ขายที่ถูกปฏิเสธ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectSeller;

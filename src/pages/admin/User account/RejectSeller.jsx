import { useState } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RejectSeller = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [previewDocUrl, setPreviewDocUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sellersPerPage = 5;

  const rejectedSellers = [
    {
      id: "S015",
      name: "ธีรภัทร กุลโชติ",
      email: "teerapat@email.com",
      phone: "091-555-2323",
      citizenId: "1103700111999",
      company: "TP Property",
      license: "L-45321",
      document: "/docs/ใบอนุญาตหมดอายุ.pdf",
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
      document: "/docs/ทะเบียนบริษัทไม่ชัดเจน.pdf",
      reason: "เอกสารทะเบียนบริษัทไม่ชัดเจน",
    },
    // เพิ่มข้อมูลเพิ่มเติมได้
  ];

  const filteredSellers = rejectedSellers.filter((seller) =>
    Object.values(seller).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);
  const indexOfLast = currentPage * sellersPerPage;
  const indexOfFirst = indexOfLast - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ผู้ขายที่ถูกปฏิเสธ</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Search className="text-gray-500" />
        <Input
          type="text"
          placeholder="ค้นหาด้วยชื่อ, อีเมล, บริษัท, เหตุผล..."
          className="w-72"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setCurrentPage(1);
          }}
        >
          รีเซ็ต
        </Button>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        จำนวนผู้ขายที่ถูกปฏิเสธ: {filteredSellers.length}
      </p>

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
            {currentSellers.map((seller) => (
              <tr key={seller.id} className="border-b">
                <td className="px-4 py-2">{seller.id}</td>
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2">{seller.email}</td>
                <td className="px-4 py-2">{seller.phone}</td>
                <td className="px-4 py-2">{seller.citizenId}</td>
                <td className="px-4 py-2">{seller.company}</td>
                <td className="px-4 py-2">{seller.license}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setPreviewDocUrl(seller.document)}
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    {seller.document.split("/").pop()}
                  </button>
                </td>
                <td className="px-4 py-2 text-red-600 font-medium">
                  {seller.reason}
                </td>
              </tr>
            ))}
            {currentSellers.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-400 py-4">
                  ไม่พบข้อมูลผู้ขายที่ถูกปฏิเสธ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {filteredSellers.length === 0 ? 0 : indexOfFirst + 1}–
          {Math.min(indexOfLast, filteredSellers.length)} of {filteredSellers.length}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="hover:bg-gray-200"
          >
            Prev
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="hover:bg-gray-200"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocUrl} onOpenChange={() => setPreviewDocUrl(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>ดูเอกสาร</DialogTitle>
          </DialogHeader>
          <div className="h-[80vh]">
            {previewDocUrl?.endsWith(".pdf") ? (
              <iframe
                src={previewDocUrl}
                title="Document Preview"
                className="w-full h-full border rounded"
              />
            ) : (
              <p>ไม่สามารถแสดงตัวอย่างเอกสารนี้ได้</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RejectSeller;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const VerifiedSeller = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDocUrl, setPreviewDocUrl] = useState(null);
  const itemsPerPage = 5;

  const verifiedSellers = [
    {
      id: "S010",
      name: "วรชัย จิตดี",
      email: "worachai@email.com",
      phone: "081-234-5678",
      citizenId: "1103700123456",
      company: "VR Homes",
      license: "L-00987",
      document: "/uploads/license-vrhomes.pdf",
    },
    {
      id: "S011",
      name: "พัชรี ศรีบุญ",
      email: "patcharee@email.com",
      phone: "086-789-1234",
      citizenId: "3101700123001",
      company: "Patcharee Property",
      license: "L-12345",
      document: "/uploads/patcharee-doc.pdf",
    },
  ];

  const filteredSellers = verifiedSellers.filter((s) =>
    Object.values(s).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ผู้ขายที่ผ่านการอนุมัติแล้ว</h1>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-gray-500" />
        <Input
          placeholder="ค้นหาด้วยชื่อ, อีเมล, บริษัท, ใบอนุญาต..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-72"
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
        จำนวนรายการทั้งหมด: {filteredSellers.length}
      </p>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-sm text-gray-700">
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
            {currentSellers.length > 0 ? (
              currentSellers.map((seller) => (
                <tr key={seller.id} className="border-t hover:bg-gray-50">
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  ไม่พบข้อมูลที่ตรงกับคำค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirst + 1}–
          {Math.min(indexOfLast, filteredSellers.length)} of{" "}
          {filteredSellers.length}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="hover:bg-gray-100 transition"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            className="hover:bg-gray-100 transition"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Document Preview Dialog */}
      <Dialog
        open={!!previewDocUrl}
        onOpenChange={() => setPreviewDocUrl(null)}
      >
        <DialogContent className="max-w-4xl h-[85vh]">
          <DialogHeader>
            <DialogTitle>ดูเอกสาร PDF</DialogTitle>
          </DialogHeader>
          {previewDocUrl ? (
            <iframe
              src={previewDocUrl}
              title="Document Preview"
              className="w-full h-[70vh] border"
            />
          ) : null}
          <DialogFooter className="mt-4">
            <Button onClick={() => setPreviewDocUrl(null)}>ปิด</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifiedSeller;

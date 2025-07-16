import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DepositDialog from "@/components/Dialog/DepositDialog";

const PayDeposit = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [data, setData] = useState([
    {
      id: "TX001",
      buyer: "สมชาย ใจดี",
      seller: "บ. บ้านดี",
      property: "บ้านเดี่ยว บางนา",
      amount: "฿50,000",
      date: "2025-07-10",
      status: "รอตรวจสอบ",
    },
    {
      id: "TX002",
      buyer: "ศิริพร สายใจ",
      seller: "คุณทองดี",
      property: "คอนโด สาทร",
      amount: "฿100,000",
      date: "2025-07-12",
      status: "รอตรวจสอบ",
    },
    // เพิ่มรายการเพิ่มเติมได้
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setSelected(null);
  };

  const filtered = data.filter((item) => {
    const matchText =
      item.buyer.includes(search) ||
      item.seller.includes(search) ||
      item.property.includes(search);
    const matchStatus =
      statusFilter !== "all" ? item.status === statusFilter : true;
    const matchDate = dateFilter ? item.date === dateFilter : true;
    return matchText && matchStatus && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการชำระเงินมัดจำ</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Search className="text-gray-500" />
        <Input
          placeholder="ค้นหา Buyer / Seller / Property"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-72"
        />
        <Select onValueChange={(v) => {
          setStatusFilter(v);
          setCurrentPage(1);
        }} value={statusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="กรองตามสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="รอตรวจสอบ">รอตรวจสอบ</SelectItem>
            <SelectItem value="อนุมัติ">อนุมัติ</SelectItem>
            <SelectItem value="ปฏิเสธ">ปฏิเสธ</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          className="w-48"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setStatusFilter("all");
            setDateFilter("");
            setCurrentPage(1);
          }}
        >
          รีเซ็ต
        </Button>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        จำนวนรายการทั้งหมด: {filtered.length}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-sm font-medium text-gray-600 text-left">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Buyer</th>
              <th className="py-2 px-4 border">Property</th>
              <th className="py-2 px-4 border">Seller</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  ไม่พบรายการที่ตรงกับเงื่อนไข
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="text-sm text-gray-700">
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">{item.buyer}</td>
                  <td className="py-2 px-4 border">{item.property}</td>
                  <td className="py-2 px-4 border">{item.seller}</td>
                  <td className="py-2 px-4 border">{item.amount}</td>
                  <td className="py-2 px-4 border">{item.date}</td>
                  <td className="py-2 px-4 border">{item.status}</td>
                  <td className="py-2 px-4 border">
                    <Button size="sm" onClick={() => setSelected(item)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
          {Math.min(indexOfLast, filtered.length)} of {filtered.length}
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

      {/* Dialog */}
      <DepositDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        data={selected}
        onConfirm={() => handleStatusUpdate(selected.id, "อนุมัติ")}
        onReject={() => handleStatusUpdate(selected.id, "ปฏิเสธ")}
      />
    </div>
  );
};

export default PayDeposit;

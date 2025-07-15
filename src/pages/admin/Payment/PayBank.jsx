// PayBank.jsx
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import BankDialog from "@/components/Dialog/BankDialog";

const PayBank = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const [data, setData] = useState([
    {
      id: "BANK001",
      buyer: "ธนพล ใจดี",
      seller: "คุณปิติชัย",
      property: "บ้านแฝด ลาดกระบัง",
      amount: "฿80,000",
      date: "2025-07-13",
      status: "รอตรวจสอบ",
      slip: "https://via.placeholder.com/300x200?text=Bank+Slip+1",
    },
    {
      id: "BANK002",
      buyer: "สุดารัตน์ ทองคำ",
      seller: "บริษัท บีบีโฮม",
      property: "คอนโด MRT สุทธิสาร",
      amount: "฿120,000",
      date: "2025-07-14",
      status: "รอตรวจสอบ",
      slip: "https://via.placeholder.com/300x200?text=Bank+Slip+2",
    },
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setSelected(null);
  };

  const filtered = data.filter((item) => {
    const matchText =
      item.buyer.includes(search) ||
      item.seller.includes(search) ||
      item.property.includes(search);
    const matchStatus = statusFilter !== "all" ? item.status === statusFilter : true;
    const matchDate = dateFilter ? item.date === dateFilter : true;
    return matchText && matchStatus && matchDate;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการโอนเงินผ่านบัญชีธนาคาร</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Search className="text-gray-500" />
        <Input
          placeholder="ค้นหา Buyer / Seller / Property"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72"
        />
        <Select onValueChange={setStatusFilter} value={statusFilter}>
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
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setStatusFilter("all");
            setDateFilter("");
          }}
        >
          รีเซ็ต
        </Button>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        จำนวนรายการทั้งหมด: {filtered.length}
      </p>

      {/* Table */}
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
            {filtered.map((item) => (
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      <BankDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        data={selected}
        onConfirm={() => handleStatusUpdate(selected.id, "อนุมัติ")}
        onReject={() => handleStatusUpdate(selected.id, "ปฏิเสธ")}
      />
    </div>
  );
};

export default PayBank;

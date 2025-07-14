import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PayDeposit = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const data = [
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
  ];

  const filtered = data.filter(
    (item) =>
      item.buyer.includes(search) ||
      item.seller.includes(search) ||
      item.property.includes(search)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการชำระเงินมัดจำ</h1>

      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-gray-500" />
        <Input
          placeholder="ค้นหา Buyer / Seller / Property"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
      </div>

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

      {/* Popup */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>รายละเอียดการชำระ</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <p><strong>รหัสรายการ:</strong> {selected.id}</p>
              <p><strong>ผู้ซื้อ:</strong> {selected.buyer}</p>
              <p><strong>ผู้ขาย:</strong> {selected.seller}</p>
              <p><strong>อสังหา:</strong> {selected.property}</p>
              <p><strong>จำนวนเงิน:</strong> {selected.amount}</p>
              <p><strong>วันที่:</strong> {selected.date}</p>
              <p><strong>สถานะ:</strong> {selected.status}</p>
              {/* ปุ่มอนุมัติหรือปฏิเสธ */}
              <div className="flex gap-2 pt-4">
                <Button className="bg-green-500 hover:bg-green-600">อนุมัติ</Button>
                <Button className="bg-red-500 hover:bg-red-600">ปฏิเสธ</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayDeposit;

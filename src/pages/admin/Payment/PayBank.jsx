// src/pages/admin/Payment/PayBank.jsx
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PayBank = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const payments = [
    {
      id: "TX001",
      buyer: "นายวีรวัฒน์ ศิริ",
      seller: "บจก. บ้านดี จำกัด",
      property: "บ้านเดี่ยว โครงการ A สวนหลวง",
      amount: "1,000,000",
      bank: "ธนาคารกรุงเทพ",
      accountName: "บจก. บ้านดี จำกัด",
      date: "2025-07-14 14:30",
      slip: "https://via.placeholder.com/400x300.png?text=Slip+Preview",
    },
    // เพิ่มรายการอื่นตามต้องการ
  ];

  const filtered = payments.filter(
    (item) =>
      item.buyer.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.toLowerCase().includes(search.toLowerCase()) ||
      item.property.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการโอนเงินผ่านธนาคาร</h1>

      <Input
        placeholder="🔍 ค้นหาจาก Buyer / Seller / Property"
        className="max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Buyer</th>
              <th className="border px-4 py-2">Seller</th>
              <th className="border px-4 py-2">Property</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.buyer}</td>
                <td className="border px-4 py-2">{item.seller}</td>
                <td className="border px-4 py-2">{item.property}</td>
                <td className="border px-4 py-2">฿{item.amount}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2 text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelected(item)}>
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogHeader>
                        <DialogTitle>รายละเอียดการโอน</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <div><strong>Transaction ID:</strong> {item.id}</div>
                        <div><strong>ผู้ซื้อ:</strong> {item.buyer}</div>
                        <div><strong>ผู้ขาย:</strong> {item.seller}</div>
                        <div><strong>ทรัพย์สิน:</strong> {item.property}</div>
                        <div><strong>จำนวนเงิน:</strong> ฿{item.amount}</div>
                        <div><strong>ธนาคาร:</strong> {item.bank}</div>
                        <div><strong>ชื่อบัญชีผู้รับ:</strong> {item.accountName}</div>
                        <div><strong>วันเวลาที่โอน:</strong> {item.date}</div>
                        <div className="mt-4">
                          <img
                            src={item.slip}
                            alt="Slip"
                            className="w-full rounded shadow border"
                          />
                        </div>
                        <div className="flex gap-2 justify-end mt-4">
                          <Button variant="destructive">Reject</Button>
                          <Button>Approve</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
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

export default PayBank;

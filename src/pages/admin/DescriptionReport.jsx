import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const DescriptionReport = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [reports, setReports] = useState([
    {
      id: "RP001",
      reporter: "สุภาพร ทองดี",
      type: "อสังหา",
      target: "บ้านหรู พระราม 9",
      description: "ภาพไม่ตรงกับความจริง และไม่มีเบอร์ติดต่อ",
      date: "2025-07-14",
      status: "ยังไม่อ่าน",
    },
    {
      id: "RP002",
      reporter: "ธนพล ใจเย็น",
      type: "ผู้ขาย",
      target: "คุณประสิทธิ์ บ้านดี",
      description: "ผู้ขายพูดจาไม่สุภาพและเร่งรัดเกินไป",
      date: "2025-07-12",
      status: "กำลังตรวจสอบ",
    },
  ]);

  const handleView = (report) => {
    if (report.status === "ยังไม่อ่าน") {
      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id ? { ...r, status: "อ่านแล้ว" } : r
        )
      );
    }
    setSelected(report);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setSelected((prev) => ({ ...prev, status: newStatus }));
  };

  const filtered = reports.filter((item) => {
    const matchText =
      item.reporter.includes(search) ||
      item.target.includes(search) ||
      item.type.includes(search);
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    const matchDate = dateFilter ? item.date === dateFilter : true;
    return matchText && matchStatus && matchDate;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการรายงานปัญหา</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <Search className="text-gray-500" />
          <Input
            placeholder="ค้นหา Reporter / Type / Target"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">ทั้งหมด</option>
          <option value="ยังไม่อ่าน">ยังไม่อ่าน</option>
          <option value="อ่านแล้ว">อ่านแล้ว</option>
          <option value="กำลังตรวจสอบ">กำลังตรวจสอบ</option>
          <option value="ปิดเคส">ปิดเคส</option>
        </select>

        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-fit"
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setStatusFilter("");
            setDateFilter("");
          }}
        >
          รีเซ็ต
        </Button>
      </div>
      {/* จำนวนรายการ */}
        <p className="text-sm text-gray-500 mb-2">
            จำนวนรายการทั้งหมด: {filtered.length}
        </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-sm font-medium text-gray-600 text-left">
              <th className="py-2 px-4 border">Report ID</th>
              <th className="py-2 px-4 border">Reporter</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Target</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="text-sm text-gray-700">
                <td className="py-2 px-4 border">{item.id}</td>
                <td className="py-2 px-4 border">{item.reporter}</td>
                <td className="py-2 px-4 border">{item.type}</td>
                <td className="py-2 px-4 border">{item.target}</td>
                <td className="py-2 px-4 border">{item.date}</td>
                <td className="py-2 px-4 border">{item.status}</td>
                <td className="py-2 px-4 border">
                  <Button size="sm" onClick={() => handleView(item)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>รายละเอียดการรายงาน</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>รหัสรายงาน:</strong> {selected.id}</p>
              <p><strong>ผู้แจ้ง:</strong> {selected.reporter}</p>
              <p><strong>ประเภท:</strong> {selected.type}</p>
              <p><strong>เป้าหมาย:</strong> {selected.target}</p>
              <p><strong>วันที่:</strong> {selected.date}</p>
              <p><strong>รายละเอียด:</strong> {selected.description}</p>
              <p><strong>สถานะ:</strong> {selected.status}</p>

              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => handleUpdateStatus(selected.id, "กำลังตรวจสอบ")}
                >
                  กำลังตรวจสอบ
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleUpdateStatus(selected.id, "ปิดเคส")}
                >
                  ปิดเคส
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DescriptionReport;

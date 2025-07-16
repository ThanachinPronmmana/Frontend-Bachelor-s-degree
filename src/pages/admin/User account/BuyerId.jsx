// pages/admin/UserAccount/BuyerId.jsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp,Search } from "lucide-react";

const BuyerId = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    readiness: "",
    income: "",
    province: "",
    propertyType: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const buyersPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [buyers, setBuyers] = useState([
    {
      id: "B001",
      fullName: "Somchai Prasert",
      email: "somchai@example.com",
      phone: "081-234-5678",
      age: 35,
      occupation: "Engineer",
      income: "50000",
      familySize: 4,
      readiness: "High",
      province: "Bangkok",
      propertyType: "บ้านเดี่ยว",
      dateRegistered: "2025-07-01",
    },
    {
      id: "B002",
      fullName: "Nattaya Meesuk",
      email: "nattaya@example.com",
      phone: "089-876-5432",
      age: 29,
      occupation: "Teacher",
      income: "30000",
      familySize: 2,
      readiness: "Medium",
      province: "Chiang Mai",
      propertyType: "คอนโด",
      dateRegistered: "2025-07-10",
    },
  ]);

  const handleDelete = () => {
    if (selectedBuyer) {
      setBuyers((prev) => prev.filter((b) => b.id !== selectedBuyer.id));
      setSelectedBuyer(null);
      setConfirmDelete(false);
    }
  };

  const filteredBuyers = buyers.filter((b) => {
    const matchSearch =
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.province.toLowerCase().includes(searchTerm.toLowerCase());

    const matchReadiness = filters.readiness
      ? b.readiness === filters.readiness
      : true;
    const matchIncome = filters.income
      ? Number(b.income) >= Number(filters.income)
      : true;
    const matchProvince = filters.province
      ? b.province === filters.province
      : true;
    const matchType = filters.propertyType
      ? b.propertyType === filters.propertyType
      : true;

    return matchSearch && matchReadiness && matchIncome && matchProvince && matchType;
  });

  const sortedBuyers = [...filteredBuyers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLast = currentPage * buyersPerPage;
  const indexOfFirst = indexOfLast - buyersPerPage;
  const currentBuyers = sortedBuyers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedBuyers.length / buyersPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">ข้อมูลของผู้ซื้อ</div>
<div className="mb-4 flex flex-wrap items-center gap-2">
  <Search className="text-gray-500" />
  <Input
    placeholder="ค้นหา ชื่อ / อีเมล / จังหวัด"
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
      setFilters({
        readiness: "",
        income: "",
        province: "",
        propertyType: "",
      });
      setCurrentPage(1);
    }}
  >
    รีเซ็ต
  </Button>
</div>


      <Collapsible open={filterOpen} onOpenChange={setFilterOpen} className="mb-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1">
            {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />} Advanced Filters
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <Input placeholder="Minimum Income" type="number" value={filters.income} onChange={(e) => setFilters({ ...filters, income: e.target.value })} />
          <Input placeholder="Province" value={filters.province} onChange={(e) => setFilters({ ...filters, province: e.target.value })} />
          <Input placeholder="Readiness" value={filters.readiness} onChange={(e) => setFilters({ ...filters, readiness: e.target.value })} />
          <Input placeholder="Property Type" value={filters.propertyType} onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })} />
        </CollapsibleContent>
      </Collapsible>

      <p className="text-sm text-gray-500 mb-2">จำนวนผู้ซื้อทั้งหมด: {filteredBuyers.length}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              {["id", "fullName", "email", "phone", "age", "occupation", "income", "familySize", "readiness", "province", "propertyType", "dateRegistered"].map((key) => (
                <th
                  key={key}
                  className="p-2 cursor-pointer hover:underline"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : null}
                </th>
              ))}
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBuyers.length === 0 ? (
              <tr>
                <td colSpan="13" className="p-4 text-center text-gray-500">No buyers found.</td>
              </tr>
            ) : (
              currentBuyers.map((buyer) => (
                <tr key={buyer.id} className="border-t border-gray-200 text-sm hover:bg-gray-50">
                  <td className="p-2">{buyer.id}</td>
                  <td className="p-2">{buyer.fullName}</td>
                  <td className="p-2">{buyer.email}</td>
                  <td className="p-2">{buyer.phone}</td>
                  <td className="p-2">{buyer.age}</td>
                  <td className="p-2">{buyer.occupation}</td>
                  <td className="p-2">{buyer.income}</td>
                  <td className="p-2">{buyer.familySize}</td>
                  <td className="p-2">{buyer.readiness}</td>
                  <td className="p-2">{buyer.province}</td>
                  <td className="p-2">{buyer.propertyType}</td>
                  <td className="p-2">{buyer.dateRegistered}</td>
                  <td className="p-2 text-center">
                    <Button size="sm" variant="outline" onClick={() => setSelectedBuyer(buyer)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

 <div className="flex justify-between items-center mt-4">
  <p className="text-sm text-gray-600">
    Showing {indexOfFirst + 1}–{Math.min(indexOfLast, sortedBuyers.length)} of {sortedBuyers.length}
  </p>
  <div className="flex items-center space-x-2">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="transition-colors hover:bg-gray-200"
    >
      Prev
    </Button>

    <span className="text-sm font-medium">
      Page {currentPage} of {totalPages}
    </span>

    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="transition-colors hover:bg-gray-200"
    >
      Next
    </Button>
  </div>
</div>


      <Dialog open={!!selectedBuyer} onOpenChange={() => setSelectedBuyer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>รายละเอียด Buyer</DialogTitle>
          </DialogHeader>
          {selectedBuyer && (
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>ID:</strong> {selectedBuyer.id}</p>
              <p><strong>Full Name:</strong> {selectedBuyer.fullName}</p>
              <p><strong>Email:</strong> {selectedBuyer.email}</p>
              <p><strong>Phone:</strong> {selectedBuyer.phone}</p>
              <p><strong>Age:</strong> {selectedBuyer.age}</p>
              <p><strong>Occupation:</strong> {selectedBuyer.occupation}</p>
              <p><strong>Income:</strong> {selectedBuyer.income}</p>
              <p><strong>Family Size:</strong> {selectedBuyer.familySize}</p>
              <p><strong>Readiness:</strong> {selectedBuyer.readiness}</p>
              <p><strong>Province:</strong> {selectedBuyer.province}</p>
              <p><strong>Property Type:</strong> {selectedBuyer.propertyType}</p>
              <p><strong>Date Registered:</strong> {selectedBuyer.dateRegistered}</p>
            </div>
          )}
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="destructive" onClick={() => setConfirmDelete(true)}>
              Delete Buyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการลบผู้ซื้อ</DialogTitle>
          </DialogHeader>
          <p className="text-sm">คุณแน่ใจหรือไม่ว่าต้องการลบผู้ซื้อรายนี้?</p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              ยกเลิก
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              ยืนยันลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyerId;

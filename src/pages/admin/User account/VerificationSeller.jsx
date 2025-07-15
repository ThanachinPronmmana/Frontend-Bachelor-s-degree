import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { format, isWithinInterval, parseISO, isAfter, isBefore } from "date-fns";

const VerificationSeller = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    company: "",
    license: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sellers = [
    {
      id: "S001",
      name: "Somchai Mahathai",
      email: "somchai@email.com",
      phone: "089-999-1234",
      citizenId: "1234567890123",
      company: "SM Property",
      license: "A-23456",
      document: "doc1.jpg",
      registeredDate: "2025-07-01",
    },
    {
      id: "S002",
      name: "Supaporn Jaidee",
      email: "supaporn@email.com",
      phone: "082-222-4567",
      citizenId: "9876543210987",
      company: "HappyHome",
      license: "B-78901",
      document: "happyhome_doc.pdf",
      registeredDate: "2025-07-10",
    },
  ];

  const handleDocumentClick = (fileName) => {
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileName);
    if (isImage) {
      setPreviewImage(`/uploads/${encodeURIComponent(fileName)}`);
    } else {
      window.open(`/uploads/${encodeURIComponent(fileName)}`, "_blank");
    }
  };

  const filteredSellers = useMemo(() => {
    return sellers.filter((s) => {
      const matchSearch = Object.values(s).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchCompany = filters.company ? s.company === filters.company : true;
      const matchLicense = filters.license ? s.license.startsWith(filters.license) : true;

      let matchDate = true;
      const date = parseISO(s.registeredDate);
      if (filters.startDate && filters.endDate) {
        matchDate = isWithinInterval(date, {
          start: parseISO(filters.startDate),
          end: parseISO(filters.endDate),
        });
      } else if (filters.startDate) {
        matchDate = isAfter(date, parseISO(filters.startDate)) || format(date, "yyyy-MM-dd") === filters.startDate;
      } else if (filters.endDate) {
        matchDate = isBefore(date, parseISO(filters.endDate)) || format(date, "yyyy-MM-dd") === filters.endDate;
      }

      return matchSearch && matchCompany && matchLicense && matchDate;
    });
  }, [searchTerm, filters]);

  const sortedSellers = useMemo(() => {
    if (!sortConfig.key) return filteredSellers;
    
    return [...filteredSellers].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredSellers, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedSellers.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedSellers = sortedSellers.slice(indexOfFirst, indexOfLast);

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

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      company: "",
      license: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Seller Verification</h2>

      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="🔍 Search by name, email, phone, company..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={resetFilters}>
          Reset Filter
        </Button>
      </div>

      <Collapsible open={filterOpen} onOpenChange={setFilterOpen} className="mb-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1">
            {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />} Advanced Filters
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
          <Select 
            value={filters.company} 
            onValueChange={(value) => setFilters({...filters, company: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="All companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SM Property">SM Property</SelectItem>
              <SelectItem value="HappyHome">HappyHome</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.license} 
            onValueChange={(value) => setFilters({...filters, license: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="All licenses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="date" 
            placeholder="Start date"
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
          />

          <Input 
            type="date" 
            placeholder="End date"
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
          />
        </CollapsibleContent>
      </Collapsible>

      <p className="text-sm text-gray-500 mb-2">จำนวนผู้ขายทั้งหมด: {filteredSellers.length}</p>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              {["id", "name", "email", "phone", "citizenId", "company", "license", "registeredDate", "document"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left cursor-pointer hover:underline"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (
                    sortConfig.direction === "asc" ? " ▲" : " ▼"
                  )}
                </th>
              ))}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {paginatedSellers.map((seller) => (
              <tr key={seller.id} className="border-b">
                <td className="px-4 py-2">{seller.id}</td>
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2">{seller.email}</td>
                <td className="px-4 py-2">{seller.phone}</td>
                <td className="px-4 py-2">{seller.citizenId}</td>
                <td className="px-4 py-2">{seller.company}</td>
                <td className="px-4 py-2">{seller.license}</td>
                <td className="px-4 py-2">{format(parseISO(seller.registeredDate), "yyyy-MM-dd")}</td>
                <td
                  className="px-4 py-2 underline text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => handleDocumentClick(seller.document)}
                >
                  {seller.document}
                </td>
                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                    ✅ Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
            {filteredSellers.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center text-gray-400 py-4">
                  No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirst + 1}–{Math.min(indexOfLast, sortedSellers.length)} of {sortedSellers.length}
        </p>
        <div className="space-x-2">
          <Button 
            variant="outline" 
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
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {previewImage && (
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Document Preview</DialogTitle>
            </DialogHeader>
            <img
              src={previewImage}
              alt="Document Preview"
              className="max-h-[75vh] mx-auto rounded shadow"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VerificationSeller;
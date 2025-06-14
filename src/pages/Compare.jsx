import React from "react";
import { useCompare } from "@/context/CompareContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">ยังไม่มีบ้านในรายการเปรียบเทียบ</h1>
        <Link to="/" className="text-blue-600 underline">กลับไปเลือกบ้าน</Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">เปรียบเทียบบ้าน</h1>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">หัวข้อ</th>
              {compareList.map((house) => (
                <th key={house.id} className="border p-2">{house.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">รูปภาพ</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">
                  <img src={house.src} alt={house.name} className="w-40 h-32 object-cover" />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">ราคา</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">{house.price || "-"}</td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">ขนาด</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">{house.size || "-"}</td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">ทำเล</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">{house.location || "-"}</td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">จำนวนห้อง</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">
                  {house.bedrooms || 0} นอน / {house.bathrooms || 0} น้ำ
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">ประเภท</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">{house.type || "-"}</td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">ดูรายละเอียด</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">
                  <Link to={`/post/${house.id}`}>
                    <Button className="bg-green-600 text-white">ดูรายละเอียด</Button>
                  </Link>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2">ลบ</td>
              {compareList.map((house) => (
                <td key={house.id} className="border p-2">
                  <Button onClick={() => removeFromCompare(house.id)} className="bg-red-500 text-white">ลบ</Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex gap-3 flex-wrap">
        <Button
          onClick={() => {
            if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างรายการเปรียบเทียบทั้งหมด?")) {
              clearCompare();
            }
          }}
          className="bg-gray-700 text-white"
        >
          ล้าง Compare
        </Button>
        <Link to="/">
          <Button className="bg-blue-600 text-white">กลับไปเลือกบ้าน</Button>
        </Link>
      </div>
    </div>
  );
};

export default Compare;

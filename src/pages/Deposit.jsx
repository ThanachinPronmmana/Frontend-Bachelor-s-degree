import Buttons from "@/components/Buttons";
import Credit from "@/components/Credit";
import { Button } from "@/components/ui/button";
import mockHouses from "@/data/mockHouses";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BedSingle, Bath, Grid2x2 } from 'lucide-react';
import { useCompare } from "@/context/CompareContext";

const Deposit = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const navigate = useNavigate();
  const { addToCompare, compareList } = useCompare();

  useEffect(() => {
    const foundHouse = mockHouses.find((h) => h.id === id);
    setHouse(foundHouse);
  }, [id]);

  if (!house) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const isAlreadyCompared = compareList.some((item) => item.id === house.id);
  const compareHouse = {
    id: house.id,
    name: house.name,
    src: house.images?.[0],
    price: house.price,
    size: house.size,
    badroom: house.badroom,
    bathroom: house.bathroom
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 md:py-10">
        {/* ส่วนแสดงภาพ */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* รูปใหญ่ */}
          <div className="w-full lg:w-[55%]">
            {house.images?.[0] && (
              <img
                src={house.images[0]}
                alt="main-house"
                className="rounded-3xl w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover shadow-md"
              />
            )}
          </div>

          {/* รูปเล็ก */}
          <div className="w-full lg:w-[45%] grid grid-cols-2 gap-3">
            {house.images?.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`sub-house-${index}`}
                className="rounded-3xl w-full h-[120px] sm:h-[170px] md:h-[220px] object-cover shadow-md"
              />
            ))}
          </div>
        </div>

        {/* ส่วนข้อมูลบ้าน */}
        <div className="mt-8 border-b border-gray-200 pb-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{house.agent.name}</h1>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">{house.name}</h2>
            </div>

            <p className="text-gray-700">{house.discription}</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <button
                onClick={() => navigate("/profile/seller")}
                className="text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium flex items-center"
              >
                รายละเอียดผู้ขาย <span className="ml-1">→</span>
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium flex items-center">
                สำรวจแผนที่ <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ส่วนราคาและรายละเอียด */}
        <div className="flex flex-col xl:flex-row mt-8 gap-8">
          {/* ส่วนซ้าย - ราคาและปุ่ม */}
          <div className="xl:w-[40%] border-b xl:border-b-0 xl:border-r border-gray-200 pb-8 xl:pb-0 xl:pr-8">
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-600">เริ่มต้น</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">${house.price.toLocaleString()}</h1>
              <p className="text-sm font-semibold text-gray-600 mt-3">สินเชื่อที่อยู่อาศัย</p>
              <p className="text-xl text-gray-800">{house.agent.loan}</p>
            </div>

            <div className="space-y-4">
              <Buttons
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  if (!user || user.userType !== "Buyer") {
                    navigate("/login");
                  } else {
                    navigate("/Deposit_doc", { state: { house } });
                  }
                }}
                text="มัดจำ"
                color="bg-blue-600 hover:bg-blue-700"
                lenghbutton="w-full"
              />

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {isAlreadyCompared ? (
                    <Button className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3">
                      ✅ เพิ่มในรายการเปรียบเทียบแล้ว
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                      onClick={() => addToCompare(compareHouse)}
                    >
                      + เพิ่มในรายการเปรียบเทียบ
                    </Button>
                  )}
                </div>

                {/* ปุ่มดูรายการเปรียบเทียบที่แยกบรรทัดใหม่ */}
                <Link to="/compare" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    ดูรายการเปรียบเทียบ
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ส่วนขวา - รายละเอียดเพิ่มเติม */}
          <div className="xl:w-[60%]">
            {/* รายละเอียดห้อง */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">รายละเอียดห้อง</h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <BedSingle className="mx-auto size-6 text-blue-600" />
                  <p className="mt-2 font-medium text-gray-800">{house.badroom} ห้องนอน</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Bath className="mx-auto size-6 text-blue-600" />
                  <p className="mt-2 font-medium text-gray-800">{house.bathroom} ห้องน้ำ</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Grid2x2 className="mx-auto size-6 text-blue-600" />
                  <p className="mt-2 font-medium text-gray-800">{house.size} ตร.ม.</p>
                </div>
              </div>
            </div>

            {/* ข้อมูลผู้ขาย */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">ข้อมูลผู้ขาย</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {house.agent.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{house.agent.name}</p>
                  <p className="text-sm text-gray-600">{house.agent.contact}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/profile/seller")}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ดูโปรไฟล์ผู้ขายทั้งหมด →
              </button>
            </div>

            {/* ปุ่มเพิ่มเติม */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
                บันทึกไว้ดูภายหลัง
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
                แชร์ประกาศนี้
              </button>
            </div>
          </div>
        </div>


      </div>
      <Credit className="mt-12" />
    </div>
  );
};

export default Deposit;
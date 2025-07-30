import { Link } from "react-router";
import { Facebook, Instagram, Youtube, HeartPlus } from "lucide-react";
import { useEffect, useState } from "react";
import mockHouses from "@/data/mockHouses";
const Credit = () => {
  const [expanded, setExpanded] = useState(false);
  const [house, setHouse] = useState([]);
  const toggleTex = () => {
    setExpanded((prev) => !prev);
  };
  useEffect(() => {
    // โหลดข้อมูลเมื่อ component mount
    setHouse(mockHouses);
  }, []);
  return (
    <div className="w-full bg-white ">
      <div className="flex items-center justify-between bg-[#3D4C63] h-20 border-b-2 border-white px-6 sm:px-10 lg:px-70">
        <div className="flex space-x-8">
          <p className="text-white">Contact Us</p>
          <Link to="/Support">
            <div className="flex space-x-2 text-white hover:text-blue-300">
              <p>Support</p>
              <HeartPlus />
            </div>
          </Link>
        </div>

        <div className="flex space-x-8">
          <p className="text-white">Follow Us</p>
          <Facebook className="text-white hover:text-blue-300 cursor-pointer " />
          <Instagram className="text-white hover:text-blue-300 cursor-pointer" />
          <Youtube className="text-white hover:text-blue-300 cursor-pointer " />
        </div>
      </div>
      <div className="bg-gray-200 w-full lg:px-70 sm:px-10 pt-5 pb-8">
        <p
          className={`text-black text-sm opacity-70 transition-all duration-300 ease-in-out ${expanded ? "line-clamp-none" : "line-clamp-1"}`}
        >
          Yuu Yenn Property - “เพราะบ้าน...คือมากกว่าหลังคาและผนัง”
          มันคือจุดเริ่มต้นของชีวิตใหม่ ความฝันของครอบครัว พื้นที่เล็ก ๆ
          ที่คุณสร้างเรื่องราวขึ้นมาเองในทุกวัน ไม่ว่าคุณจะเพิ่งเริ่มทำงาน
          กำลังสร้างครอบครัว
          หรือมองหาที่พักที่สะท้อนตัวตนของคุณ—เราพร้อมอยู่ข้างคุณ ที่ Yuu Yenn
          Property เราไม่ได้เป็นแค่เว็บขายบ้าน
          แต่เราอยากเป็นเพื่อนร่วมทางของคุณในการค้นหาสถานที่ที่เรียกว่า “บ้าน”
          เราออกแบบแพลตฟอร์มให้ใช้งานง่าย ตอบโจทย์ทุกไลฟ์สไตล์
          ทั้งคอนโดในเมืองสำหรับชีวิตที่เร่งรีบ บ้านชานเมืองที่เต็มไปด้วยต้นไม้
          หรือบ้านมือสองราคาดีที่คุณแต่งเติมได้เองในแบบที่คุณเป็น
          เรามีระบบค้นหาที่ฉลาด แสดงผลเรียลไทม์ ฟิลเตอร์ครบ
          และแผนที่เข้าใจง่าย—เพราะเราเข้าใจว่าคุณไม่มีเวลาให้กับความวุ่นวาย
          เรายังมีทีมแชตให้คำปรึกษาแบบ real-human ไม่ใช่แค่บอท
          เรามีรีวิวบ้านจริงจากผู้ซื้อจริง และที่สำคัญคือ ไม่มีค่าธรรมเนียมแฝง
          ไม่มีนายหน้าแอบแฝง ในวันที่คุณพร้อม…แค่เปิดมือถือ
          แล้วมาเริ่มการเดินทางครั้งสำคัญของชีวิตกับเรา บ้านในฝันของคุณ
          ไม่ควรเป็นแค่ความฝัน
        </p>

        <button
          onClick={toggleTex}
          className="mt-3 text-blue-600 hover:underline text-sm cursor-pointer"
        >
          {expanded ? "ซ่อนรายละเอียด" : "อ่านเพิ่มเติม"}
        </button>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">รายชื่อบ้าน</h2>
          <ul className="list-disc pl-6">
            {house.map((house, index) => (
              <li key={index}>{house.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" flex bg-[#3D4C63] h-20 w-full  border-t-2 border-while  justify-between pl-70 pr-70 pt-5">
        <Link to="Support">
          <p className="text-white">...</p>
        </Link>
        <p className="flex text-white ">© 2025 AllProperty Media Co. Ltd.</p>
      </div>
    </div>
  );
};
export default Credit;

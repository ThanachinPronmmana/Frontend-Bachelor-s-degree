import { useEffect, useState } from "react";
import { FaUser, FaHeart, FaBell, FaFileAlt } from "react-icons/fa";
import BuyerInfo from "./BuyerInfo";
import BuyerFavorite from "./BuyerFavorite";
import BuyerNoti from "./BuyerNoti";
import BuyerDoc from "./BuyerDoc";
import { getbuyer } from "@/api/user";

const ProfileBuyer = () => {
  const [selectedTab, setSelectedTab] = useState("info");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันโหลดข้อมูล user
  const fetchUser = async () => {
    try {
      const id = localStorage.getItem("id");
      
      const data = await getbuyer(id);
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // เรียกใช้ fetchUser ตอน component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // แสดงสถานะโหลดข้อมูล
  if (loading) {
    return <div className="text-center mt-10">กำลังโหลดข้อมูลผู้ใช้...</div>;
  }

  return (
    <div className="min-h-screen bg-[#ecf0f1] px-8 py-10">
      <div className="max-w-7xl mx-auto flex bg-white rounded-xl shadow-lg overflow-hidden min-h-[80vh]">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#2c3e50] text-white py-10 px-6 relative">
          {/* User Info */}
          <div className="mb-10 flex items-center space-x-4">
            <img
              src={user.image}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-300">Welcome</p>
              <p className="font-bold text-white">{user?.First_name} {user?.Last_name}</p>
            </div>
          </div>

          {/* Tab Menu */}
          <ul className="space-y-2 text-lg">
            {[ 
              { label: "My Info", key: "info", icon: <FaUser className="mr-2" /> },
              { label: "Saved", key: "favorite", icon: <FaHeart className="mr-2" /> },
              { label: "Notification", key: "noti", icon: <FaBell className="mr-2" /> },
              { label: "Document", key: "doc", icon: <FaFileAlt className="mr-2" /> },
            ].map((tab) => (
              <li key={tab.key} className="relative">
                <button
                  onClick={() => setSelectedTab(tab.key)}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition duration-150 ${
                    selectedTab === tab.key ? "bg-[#34495e]" : "hover:bg-[#3e5870]"
                  }`}
                >
                  {selectedTab === tab.key && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-tr-md rounded-br-md"></span>
                  )}
                  {tab.icon}
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-10 overflow-y-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            Home / Profile / <span className="text-gray-800 capitalize">{selectedTab}</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-3xl font-bold flex items-center mb-8">
            {[
              { label: "My Info", key: "info", icon: <FaUser className="mr-2" /> },
              { label: "Saved", key: "favorite", icon: <FaHeart className="mr-2" /> },
              { label: "Notification", key: "noti", icon: <FaBell className="mr-2" /> },
              { label: "Document", key: "doc", icon: <FaFileAlt className="mr-2" /> },
            ].find((tab) => tab.key === selectedTab)?.icon}
            {[
              { label: "My Info", key: "info", icon: <FaUser className="mr-2" /> },
              { label: "Saved", key: "favorite", icon: <FaHeart className="mr-2" /> },
              { label: "Notification", key: "noti", icon: <FaBell className="mr-2" /> },
              { label: "Document", key: "doc", icon: <FaFileAlt className="mr-2" /> },
            ].find((tab) => tab.key === selectedTab)?.label}
          </h1>

          {/* Content */}
          {selectedTab === "info" && <BuyerInfo user={user} setUser={setUser} />}
          {selectedTab === "favorite" && <BuyerFavorite />}
          {selectedTab === "noti" && <BuyerNoti />}
          {selectedTab === "doc" && <BuyerDoc />}
        </div>
      </div>
    </div>
  );
};

export default ProfileBuyer;

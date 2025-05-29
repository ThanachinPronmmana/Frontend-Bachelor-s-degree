import { useState } from "react";
import {FaUser,FaHome,FaBell,FaFileAlt,FaTachometerAlt} from "react-icons/fa";
import SellerInfo from "./SellerInfo";
import SellerPost from "./SellerPost";
import SellerDashboard from "./SellerDashboard";
import SellerNoti from "./SellerNoti";
import SellerDoc from "./SellerDoc";

const ProfileSeller = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  const tabs = [
    { label: "Info", key: "info", icon: <FaUser className="mr-2" /> },
    { label: "Post", key: "post", icon: <FaHome className="mr-2" /> },
    { label: "Dashboard", key: "dashboard" , icon: <FaTachometerAlt className="mr-2" />},
    { label: "Notification", key: "noti", icon: <FaBell className="mr-2" /> },
    { label: "Document", key: "doc", icon: <FaFileAlt className="mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-[#ecf0f1] px-8 py-10">
      <div className="max-w-7xl mx-auto flex bg-white rounded-xl shadow-lg overflow-hidden min-h-[80vh]">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#2c3e50] text-white py-10 px-6 relative">
          {/* User Info */}
          <div className="mb-10 flex items-center space-x-4">
            <img
              src="https://ui-avatars.com/api/?name=คุณโช&background=34495e&color=fff"
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-300">Welcome</p>
              <p className="font-bold text-white">คุณ.....</p>
            </div>
          </div>

          {/* Tab Menu */}
          <ul className="space-y-2 text-lg">
            {tabs.map((tab) => (
              <li key={tab.key} className="relative">
                <button
                  onClick={() => setSelectedTab(tab.key)}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition duration-150 ${
                    selectedTab === tab.key
                      ? "bg-[#34495e]"
                      : "hover:bg-[#3e5870]"
                  }`}
                >
                  {/* Active Indicator */}
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
            {tabs.find((tab) => tab.key === selectedTab)?.icon}
            {tabs.find((tab) => tab.key === selectedTab)?.label}
          </h1>

          {/* Content */}
          {selectedTab === "info" && <SellerInfo />}
          {selectedTab === "post" && <SellerPost />}
          {selectedTab === "dashboard" && <SellerDashboard />}
          {selectedTab === "noti" && <SellerNoti />}
          {selectedTab === "doc" && <SellerDoc />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSeller;

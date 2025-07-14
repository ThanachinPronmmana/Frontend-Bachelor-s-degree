import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SidebarAdmin = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // 👈 submenu toggle
  const location = useLocation();

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleSubMenu = (key) => {
    setActiveSubMenu(activeSubMenu === key ? null : key);
  };

  const isActiveRoute = (path) =>
    location.pathname === path || location.pathname.startsWith(`/${path}`);

  const menuItems = [
    {
      label: "Posts of Seller",
      key: "posts",
      children: [
        { label: "Approval", path: "approval" },
        { label: "Accept post", path: "accept-post" },
        { label: "Reject post", path: "reject-post" },
      ],
    },
    {
      label: "User account",
      key: "user",
      children: [
        { label: "Buyer ID", path: "buyer-id" },
        {
          label: "Seller ID",
          key: "seller",
          children: [
            { label: "Verification Seller", path: "seller-id/verify" },
            { label: "Verified Seller", path: "seller-id/verified" },
            { label: "Reject Seller", path: "seller-id/reject" },
          ],
        },
      ],
    },
    {
      label: "Payment",
      key: "payment",
      children: [
        { label: "Pay the deposit", path: "pay-deposit" },
        { label: "Pay with bank", path: "pay-bank" },
      ],
    },
    {
      label: "Reports",
      key: "reports",
      children: [{ label: "Description Report", path: "description-report" }],
    },
    {
      label: "Document",
      key: "doc",
      children: [],
    },
  ];

  return (
    <div className="w-64 h-screen bg-[#2c3e50] text-white p-4 space-y-4 overflow-auto">
      <div className="text-xl font-bold mb-6">🏠 Sale Houses</div>

      {menuItems.map((item) => (
        <div key={item.key}>
          <button
            onClick={() => toggleMenu(item.key)}
            className={`w-full flex justify-between items-center px-2 py-2 rounded ${
              activeMenu === item.key
                ? "bg-white text-black"
                : "bg-[#34495e] text-white"
            }`}
          >
            <span>{item.label}</span>
            {activeMenu === item.key ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {activeMenu === item.key && item.children?.length > 0 && (
            <div className="ml-4 mt-2 space-y-1">
              {item.children.map((sub) => {
                // ✅ submenu nested
                if (sub.children) {
                  return (
                    <div key={sub.key}>
                      <button
                        onClick={() => toggleSubMenu(sub.key)}
                        className="w-full flex justify-between items-center px-2 py-1 rounded bg-[#3c5d70] text-white"
                      >
                        <span>{sub.label}</span>
                        {activeSubMenu === sub.key ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </button>
                      {activeSubMenu === sub.key && (
                        <div className="ml-4 mt-1 space-y-1">
                          {sub.children.map((nested) => (
                            <Link
                              key={nested.path}
                              to={nested.path}
                              className={`block px-2 py-1 rounded ${
                                isActiveRoute(nested.path)
                                  ? "bg-white text-black font-medium"
                                  : "text-gray-300 hover:text-white"
                              }`}
                            >
                              {nested.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // ✅ normal submenu
                return (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    className={`block px-2 py-1 rounded ${
                      isActiveRoute(sub.path)
                        ? "bg-white text-black font-medium"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarAdmin;

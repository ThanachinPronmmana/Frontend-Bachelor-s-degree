import { Outlet } from "react-router";
import SidebarAdmin from "../components/NavAdmin/SidebarAdmin"; 

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;

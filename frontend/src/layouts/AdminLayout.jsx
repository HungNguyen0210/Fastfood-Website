import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";
import ManageAccount from "../pages/admin/ManageAccount";
import ManageProduct from "../pages/admin/ManageProduct";
import ManageCategory from "../pages/admin/ManageCategory";
import ManageNews from "../pages/admin/ManageNews";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("account");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarItems = {
    account: <ManageAccount />,
    product: <ManageProduct />,
    category: <ManageCategory />,
    news: <ManageNews />,
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        setActivePage={setActivePage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Nội dung chính */}
        <div className="p-5">{sidebarItems[activePage]}</div>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

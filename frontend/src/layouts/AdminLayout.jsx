import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/AdminSidebar";
import { useEffect, useState } from "react";
import ManageAccount from "../pages/AdminPage/Account";
import ManageProduct from "../pages/AdminPage/Product";
import ManageCategory from "../pages/AdminPage/Category";
import ManageNews from "../pages/AdminPage/News";
import AdminNavbar from "../components/common/AdminNavbar";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || "account"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem("activePage", activePage); // Lưu vào localStorage khi activePage thay đổi
  }, [activePage]);

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

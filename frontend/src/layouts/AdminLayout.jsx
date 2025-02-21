import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";
import ManageAccount from "../pages/admin/ManageAccount";
import ManageProduct from "../pages/admin/ManageProduct";
import ManageCategory from "../pages/admin/ManageCategory";
import ManageNews from "../pages/admin/ManageNews";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("account");

  const sidebarItems = {
    account: <ManageAccount />,
    product: <ManageProduct />,
    category: <ManageCategory />,
    news: <ManageNews />,
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p4">
        <h1 className="text-xl">Admin Dashboard</h1>
      </header>
      <div className="flex">
        <AdminSidebar setActivePage={setActivePage} />

        <div className="flex-1 p-5">{sidebarItems[activePage]}</div>
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

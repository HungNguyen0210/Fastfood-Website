import { FaBars, FaUser, FaBox, FaThLarge, FaNewspaper } from "react-icons/fa";

const AdminSidebar = ({ setActivePage, isCollapsed, setIsCollapsed }) => {
  // Hàm thay đổi trang và lưu vào localStorage
  const handlePageChange = (page) => {
    setActivePage(page);
    localStorage.setItem("activePage", page); // Lưu vào localStorage
  };

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen p-4`}
    >
      {/* Nút thu nhỏ/phóng to */}
      <button
        className="text-white mb-6 block focus:outline-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaBars size={20} />
      </button>

      <ul className="space-y-4">
        <li>
          <button
            onClick={() => handlePageChange("account")}
            className="flex items-center space-x-2 w-full text-left px-3 py-2 border-l-4 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all cursor-pointer"
          >
            <FaUser />
            {!isCollapsed && <span>Account</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange("product")}
            className="flex items-center space-x-2 w-full text-left px-3 py-2 border-l-4 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all cursor-pointer"
          >
            <FaBox />
            {!isCollapsed && <span>Product</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange("category")}
            className="flex items-center space-x-2 w-full text-left px-3 py-2 border-l-4 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all cursor-pointer"
          >
            <FaThLarge />
            {!isCollapsed && <span>Category</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange("news")}
            className="flex items-center space-x-2 w-full text-left px-3 py-2 border-l-4 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all cursor-pointer"
          >
            <FaNewspaper />
            {!isCollapsed && <span>News</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

import { FaBars } from "react-icons/fa"; // Import icon
import { FaUser, FaBox, FaThLarge, FaNewspaper } from "react-icons/fa";

const AdminSidebar = ({ setActivePage, isCollapsed, setIsCollapsed }) => {
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
            onClick={() => setActivePage("account")}
            className="flex items-center space-x-2 w-full text-left hover:text-yellow-400"
          >
            <FaUser />
            {!isCollapsed && <span>Account</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActivePage("product")}
            className="flex items-center space-x-2 w-full text-left hover:text-yellow-400"
          >
            <FaBox />
            {!isCollapsed && <span>Product</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActivePage("category")}
            className="flex items-center space-x-2 w-full text-left hover:text-yellow-400"
          >
            <FaThLarge />
            {!isCollapsed && <span>Category</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActivePage("news")}
            className="flex items-center space-x-2 w-full text-left hover:text-yellow-400"
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

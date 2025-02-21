import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        {/* Avatar User */}
        <FaUserCircle size={30} />

        {/* Nút Logout */}
        <button className="flex items-center space-x-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;

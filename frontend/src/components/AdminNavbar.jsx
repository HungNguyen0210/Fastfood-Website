import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

const API_URL = import.meta.env.VITE_API_URL + "/logout"; // API logout

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(API_URL, {}, { withCredentials: true });

      if (response.data.success) {
        localStorage.removeItem("activePage");
        localStorage.removeItem("jwtToken");

        toast.success("Đăng xuất thành công!");
        navigate("/login");
      } else {
        toast.error("Đăng xuất thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error("Có lỗi xảy ra khi đăng xuất!");
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Admin Dashboard</div>
      <div className="flex items-center space-x-4">
        <FaUserCircle size={24} />
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition cursor-pointer"
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountForm from "./AccountForm";
import AccountTable from "./AccountTable";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/accounts";

const ManageAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    role: "customer",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(API_URL);
      setAccounts(response.data.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tài khoản!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setAccounts((prev) =>
          prev.map((acc) =>
            acc._id === editingId ? { ...acc, ...formData } : acc
          )
        );
        toast.success("Cập nhật tài khoản thành công!");
      } else {
        const response = await axios.post(API_URL, formData);
        setAccounts([...accounts, response.data.data]);
        toast.success("Tạo tài khoản thành công!");
      }
      resetForm();
      setIsModalOpen(false); // Đóng modal sau khi xử lý xong
    } catch (error) {
      toast.error("Lỗi khi xử lý tài khoản!");
    }
  };

  const handleEdit = (account) => {
    setEditingId(account._id);
    setFormData({
      username: account.username,
      email: account.email,
      phone: account.phone,
      address: account.address,
      role: account.role,
    });
    setIsModalOpen(true); // Mở modal khi chỉnh sửa
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setAccounts((prev) => prev.filter((acc) => acc._id !== id));
      toast.success("Xóa tài khoản thành công!");
    } catch (error) {
      toast.error("Lỗi khi xóa tài khoản!");
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      phone: "",
      address: "",
      role: "customer",
    });
    setEditingId(null);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quản lý Tài Khoản</h2>

      {/* Nút mở modal để thêm tài khoản */}
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 cursor-pointer transition-all hover:bg-green-600 hover:shadow-lg"
      >
        Thêm tài khoản
      </button>

      <AccountTable
        accounts={accounts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Modal thêm / sửa tài khoản */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-200/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] transition-all">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
            </h3>

            <AccountForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editingId={editingId}
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full cursor-pointer transition-all hover:bg-gray-600 hover:shadow-md"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;

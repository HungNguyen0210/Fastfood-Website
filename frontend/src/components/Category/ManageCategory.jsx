import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/categories";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", status: 0 });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách danh mục!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === editingId ? { ...cat, ...formData } : cat
          )
        );
        toast.success("Cập nhật danh mục thành công!");
      } else {
        const response = await axios.post(API_URL, formData);
        setCategories([...categories, response.data.data]);
        toast.success("Thêm danh mục thành công!");
      }
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi xử lý danh mục!");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setFormData({ name: category.name, status: category.status });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => { 
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast.success("Xóa danh mục thành công!");
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục!");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", status: 0 });
    setEditingId(null);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quản lý Danh Mục</h2>
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 cursor-pointer hover:bg-green-600"
      >
        Thêm danh mục
      </button>
      <CategoryTable
        categories={categories}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-200/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
            </h3>
            <CategoryForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editingId={editingId}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;

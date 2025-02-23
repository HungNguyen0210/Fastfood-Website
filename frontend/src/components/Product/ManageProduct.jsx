import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

const API_URL = import.meta.env.VITE_API_URL + "/products";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    sellPrice: "",
    category: "",
    description: "",
    status: 1, // 1 = Hiện, 0 = Ẩn
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sản phẩm!");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/categories"
      );
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...formData,
        isAvailable: Number(formData.isAvailable), // Đảm bảo giá trị là 0 hoặc 1
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, updatedData);
        setProducts((prev) =>
          prev.map((product) =>
            product._id === editingId ? { ...product, ...updatedData } : product
          )
        );
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        const response = await axios.post(API_URL, updatedData);
        setProducts([...products, response.data.data]);
        toast.success("Thêm sản phẩm thành công!");
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi xử lý sản phẩm!");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      image: product.image,
      price: product.price,
      sellPrice: product.sellPrice,
      category: product.category,
      description: product.description,
      status: product.status,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      price: "",
      sellPrice: "",
      category: "",
      description: "",
      status: 1,
    });
    setEditingId(null);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quản lý Sản phẩm</h2>

      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 cursor-pointer hover:bg-green-600"
      >
        Thêm sản phẩm
      </button>

      <ProductTable products={products} handleEdit={handleEdit} />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-200/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
            </h3>

            <ProductForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              categories={categories}
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

export default ManageProduct;

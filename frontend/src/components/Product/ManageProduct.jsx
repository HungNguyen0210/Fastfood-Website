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
    isAvailable: 1, // 1 = Hiện, 0 = Ẩn
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

      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts([]); // Đảm bảo luôn có giá trị mảng
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
      toast.error("Lỗi khi tải danh sách sản phẩm!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // Lưu file để gửi lên server
        previewImage: URL.createObjectURL(file), // Tạo URL preview
      }));
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isAvailable" ? Number(value) : value, // Đảm bảo status là số
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.image) {
        toast.error("Vui lòng chọn ảnh trước khi tải lên!");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("sellPrice", formData.sellPrice);
      formDataToSend.append(
        "category",
        formData.category._id || formData.category
      );
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isAvailable", formData.isAvailable);

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image); // Chỉ gửi file mới
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await axios.post(API_URL, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Thêm sản phẩm thành công!");
      }

      resetForm();
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error("Lỗi khi xử lý sản phẩm!");
    }
  };

  const handleEdit = (product) => {
    const IMAGE_API_URL = import.meta.env.VITE_IMAGE_API_URL;

    setEditingId(product._id);
    setFormData({
      name: product.name,
      image: product.image, // Lưu ảnh cũ (có thể là string hoặc File)
      originalImageName: product.image,
      previewImage: product.image?.startsWith("http")
        ? product.image // Nếu đã có http, giữ nguyên
        : `${IMAGE_API_URL}/assets/${product.image}`,
      price: product.price,
      sellPrice: product.sellPrice,
      category: product.category?._id || product.category,
      description: product.description,
      isAvailable: product.isAvailable,
    });

    console.log(
      "Preview Image URL:",
      product.image
        ? `${IMAGE_API_URL}/assets/${product.image}`
        : "Không có ảnh"
    );
    console.log(
      "Product Image URL:",
      `${IMAGE_API_URL}/assets/${product.image}`
    );

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
      isAvailable: 1,
    });
    setEditingId(null);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md h-[80vh] overflow-auto">
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
              handleFileChange={handleFileChange}
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

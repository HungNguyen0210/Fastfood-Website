import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL + "/products";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          toast.error("Không có sản phảm nào");
        }
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">Thực đơn của chúng tôi</h1>

      {loading && <p className="text-center mt-4">Đang tải...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-500">{product.category?.name}</p>
            <p className="text-gray-600 text-sm mt-1">
              {product.sellPrice} vnd
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

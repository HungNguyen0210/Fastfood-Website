import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL + "/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL + `/isAvailable`);
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          toast.error("Không có sản phẩm nào");
        }
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách sản phẩm");
      } finally {   
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.sellPrice} đ</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

const ProductTable = ({ products, handleEdit }) => {
  return (
    <table className="mt-5 w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Ảnh</th>
          <th className="border p-2">Tên</th>
          <th className="border p-2">Giá gốc</th>
          <th className="border p-2">Giá bán</th>
          <th className="border p-2">Danh mục</th>
          <th className="border p-2">Mô tả</th>
          <th className="border p-2">Trạng thái</th>
          <th className="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="text-center">
            {/* Hiển thị ảnh sản phẩm */}
            <td className="border p-2 text-center">
              <div className="inline-block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            </td>
            <td className="border p-2">{product.name || "Không có tên"}</td>
            <td className="border p-2">{product.price || "N/A"}</td>
            <td className="border p-2">{product.sellPrice || "N/A"}</td>
            <td className="border p-2">
              {product.category?.name || "Không có danh mục"}
            </td>
            <td className="border p-2">
              {product.description
                ? product.description.length > 50
                  ? product.description.substring(0, 50) + "..."
                  : product.description
                : "Không có mô tả"}
            </td>
            <td className="border p-2">
              {product.isAvailable ? "Hiện" : "Ẩn"}
            </td>
            <td className="border p-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
              >
                Sửa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

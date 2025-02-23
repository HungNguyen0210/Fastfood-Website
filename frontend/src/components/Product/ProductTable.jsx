const ProductTable = ({ products, handleEdit }) => {
  return (
    <table className="mt-5 w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Tên</th>
          <th className="border p-2">Giá bán</th>
          <th className="border p-2">Danh mục</th>
          <th className="border p-2">Trạng thái</th>
          <th className="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="text-center">
            <td className="border p-2">{product.name}</td>
            <td className="border p-2">{product.sellPrice}</td>
            <td className="border p-2">{product.category.name}</td>
            <td className="border p-2">
              {product.isAvailable === 1 ? "Hiện" : "Ẩn"}
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

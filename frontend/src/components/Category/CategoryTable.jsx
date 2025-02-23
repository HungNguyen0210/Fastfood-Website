const CategoryTable = ({ categories, handleEdit, handleDelete }) => {
  return (
    <table className="mt-5 w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Tên danh mục</th>
          <th className="border p-2">Trạng thái</th>
          <th className="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id} className="text-center">
            <td className="border p-2">{category.name}</td>
            <td className="border p-2">
              {category.status === 1 ? "Hoạt động" : "Ẩn"}
            </td>
            <td className="border p-2">
              <button
                onClick={() => handleEdit(category)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 cursor-pointer"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;

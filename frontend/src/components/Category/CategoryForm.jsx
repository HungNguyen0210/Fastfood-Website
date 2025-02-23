const CategoryForm = ({ formData, handleChange, handleSubmit, editingId }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên danh mục"
        className="p-2 border rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value={1}>Hoạt động</option>
        <option value={0}>Ẩn</option>
      </select>

      <button
        onClick={handleSubmit}
        className={`w-full text-white px-4 py-2 rounded transition-all hover:shadow-lg cursor-pointer  ${
          editingId ? "bg-blue-500" : "bg-green-500"
        } hover:opacity-80`}
      >
        {editingId ? "Cập nhật" : "Thêm danh mục"}
      </button>
    </div>
  );
};

export default CategoryForm;

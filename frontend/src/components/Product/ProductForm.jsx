const ProductForm = ({
  formData,
  handleChange,
  handleSubmit,
  categories,
  editingId,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên sản phẩm"
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL hình ảnh"
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Giá gốc"
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="sellPrice"
        value={formData.sellPrice}
        onChange={handleChange}
        placeholder="Giá bán"
        className="p-2 border rounded"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Chọn danh mục</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Mô tả sản phẩm"
        className="p-2 border rounded"
      />
      <select
        name="isAvailable"
        value={formData.isAvailable}
        onChange={(e) =>
          handleChange({
            target: { name: "isAvailable", value: Number(e.target.value) },
          })
        }
        className="p-2 border rounded"
      >
        <option value={1}>Hiện</option>
        <option value={0}>Ẩn</option>
      </select>
      <button
        onClick={handleSubmit}
        className={`w-full text-white px-4 py-2 rounded cursor-pointer ${
          editingId ? "bg-blue-500" : "bg-green-500"
        } hover:opacity-80`}
      >
        {editingId ? "Cập nhật" : "Thêm sản phẩm"}
      </button>
    </div>
  );
};

export default ProductForm;

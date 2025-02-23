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
        <option value={0}>Ẩn</option>
        <option value={1}>Hiện</option>
      </select>
      <button
        onClick={handleSubmit}
        className={`w-full text-white px-4 py-2 rounded cursor-pointer ${
          editingId ? "bg-blue-500" : "bg-green-500"
        } hover:opacity-80`}
      >
        {editingId ? "Cập nhật" : "Thêm sản phẩm"}
      </button>

      {/* Xem trước sản phẩm */}
      <div className="border p-4 mt-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Xem trước sản phẩm</h3>
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-32 h-32 object-cover mx-auto my-2 border"
          />
        )}
        <p>
          <strong>Tên:</strong> {formData.name || "Chưa có"}
        </p>
        <p>
          <strong>Giá bán:</strong> {formData.sellPrice || "Chưa có"}
        </p>
        <p>
          <strong>Danh mục:</strong>{" "}
          {categories.find((c) => c._id === formData.category)?.name ||
            "Chưa chọn"}
        </p>
        <p>
          <strong>Mô tả:</strong> {formData.description || "Chưa có"}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          {formData.isAvailable === 1 ? "Hiện" : "Ẩn"}
        </p>
      </div>
    </div>
  );
};

export default ProductForm;

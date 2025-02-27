const ProductForm = ({
  formData,
  handleChange,
  handleSubmit,
  categories,
  editingId,
  handleFileChange,
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
      <div className="flex items-center gap-3">
        {/* Button chọn file */}
        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thêm ảnh
        </button>

        {/* Input file bị ẩn */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Hiển thị tên ảnh nếu có */}
        {formData.image && !(formData.image instanceof File) ? (
          <span className="text-gray-700">
            {formData.image.replace(/^.*[\\/]/, "")} {/* Loại bỏ đường dẫn */}
          </span>
        ) : formData.previewImage ? (
          <span className="text-gray-700">Ảnh mới được chọn</span>
        ) : null}
      </div>

      {/* Hiển thị ảnh preview */}
      {formData.previewImage ? (
        <img
          src={formData.previewImage}
          alt="Ảnh xem trước"
          className="w-32 h-32 object-cover rounded mt-2"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : formData.image && !(formData.image instanceof File) ? (
        <img
          src={`${import.meta.env.VITE_IMAGE_API_URL}/assets/${formData.image}`}
          alt="Ảnh sản phẩm"
          className="w-32 h-32 object-cover rounded mt-2"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : null}

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
        value={formData.category || ""}
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
    </div>
  );
};

export default ProductForm;

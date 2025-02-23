const AccountForm = ({ formData, handleChange, handleSubmit, editingId }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Tên tài khoản"
        className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-200"
        disabled={editingId !== null} // Không cho sửa email khi edit
      />
      <input
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        placeholder="Mật khẩu"
        className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Số điện thoại"
        className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Địa chỉ"
        className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
      >
        <option value="customer">Khách hàng</option>
        <option value="staff">Nhân viên</option>
        <option value="admin">Quản trị viên</option>
      </select>

      <button
        onClick={handleSubmit}
        className={`w-full text-white px-4 py-2 rounded transition-all hover:shadow-lg cursor-pointer ${
          editingId
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {editingId ? "Cập nhật" : "Thêm tài khoản"}
      </button>
    </div>
  );
};

export default AccountForm;

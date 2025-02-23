const AccountTable = ({ accounts, handleEdit, handleDelete }) => {
  return (
    <table className="mt-5 w-full border-collapse border border-gray-300 shadow-md">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border p-3">Tên</th>
          <th className="border p-3">Email</th>
          <th className="border p-3">Số điện thoại</th>
          <th className="border p-3">Địa chỉ</th>
          <th className="border p-3">Quyền</th>
          <th className="border p-3">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account._id} className="text-center">
            <td className="border p-3">{account.username}</td>
            <td className="border p-3">{account.email}</td>
            <td className="border p-3">{account.phone}</td>
            <td className="border p-3">{account.address}</td>
            <td className="border p-3">{account.role}</td>
            <td className="border p-3">
              <button
                onClick={() => handleEdit(account)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 cursor-pointer transition-all hover:bg-yellow-600 hover:shadow-md"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(account._id)}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer transition-all hover:bg-red-600 hover:shadow-md"
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

export default AccountTable;

const AdminSidebar = ({ setActivePage }) => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-5">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActivePage("account")}
            className="block w-full text-left hover:text-yellow-400"
          >
            Account
          </button>
        </li>
        <li>
          <button
            onClick={() => setActivePage("product")}
            className="block w-full text-left hover:text-yellow-400"
          >
            Product
          </button>
        </li>
        <li>
          <button
            onClick={() => setActivePage("category")}
            className="block w-full text-left hover:text-yellow-400"
          >
            Category
          </button>
        </li>
        <li>
          <button
            onClick={() => setActivePage("news")}
            className="block w-full text-left hover:text-yellow-400"
          >
            News
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

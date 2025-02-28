import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500">
          Hung-Fast
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-red-500 transition"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className="text-gray-700 hover:text-red-500 transition"
            >
              News
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

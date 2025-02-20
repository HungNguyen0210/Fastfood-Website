import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

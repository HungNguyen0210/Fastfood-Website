import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <main>
          <Outlet />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

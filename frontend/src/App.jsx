import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage/MainHome";
import Menu from "./pages/HomePage/MainMenu";
import News from "./pages/HomePage/MainNews";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/LoginPage/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho Login */}
        <Route path="/login" element={<Login />} />

        {/* Route chính cho trang Home, Menu, News với MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="menu" element={<Menu />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

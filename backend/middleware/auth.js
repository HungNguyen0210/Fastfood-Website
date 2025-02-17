import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, không được phép truy cập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Lấy payload từ token
    req.user = decoded; // Lưu thông tin người dùng từ token vào req.user
    next(); // Tiến hành tiếp
  } catch (error) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
};

export default verifyJWT;

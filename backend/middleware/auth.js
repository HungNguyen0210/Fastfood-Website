import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  let token;

  // Kiểm tra token trong cookie
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // Nếu không có trong cookie, kiểm tra token trong header (Authorization)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Lấy token từ header
  }

  // Nếu không có token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Chưa đăng nhập, vui lòng đăng nhập trước" });
  }

  try {
    // Xác thực và giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gắn thông tin người dùng vào request
    req.user = decoded;

    // Tiếp tục xử lý các request tiếp theo
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};

export default auth;

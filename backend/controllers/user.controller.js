import bcrypt from "bcryptjs";
import Account from "../models/account.model.js";
import generateToken from "../utils/generateToken.js"; // Đảm bảo bạn đã import hàm generateToken

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra tài khoản có tồn tại không
    const account = await Account.findOne({ email });
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra mật khẩu có đúng không
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không chính xác" });
    }

    // Tạo token và gửi về
    generateToken(res, account._id, account.username, account.role);

    return res.status(200).json({ success: true, account });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Đăng xuất thất bại" });
  }
};

import bcrypt from "bcryptjs";
import Account from "../models/account.model.js";
import generateToken from "../utils/generateToken.js"; // Đảm bảo bạn đã import hàm generateToken

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra tài khoản có tồn tại không
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra mật khẩu có đúng không
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo token và gửi về
    generateToken(res, account._id, account.username, account.role);

    return res.status(200).json({ message: "Đăng nhập thành công", account });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

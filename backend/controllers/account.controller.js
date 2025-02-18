import Account from "../models/account.model.js"; // Đảm bảo bạn đã import schema Account

// 1. Tạo tài khoản (Create)
export const createAccount = async (req, res) => {
  try {
    const { username, email, password, phone, address, role } = req.body;

    // Kiểm tra nếu tài khoản đã tồn tại
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    const newAccount = new Account({
      username,
      email,
      password,
      phone,
      address,
      role,
    });

    await newAccount.save();
    return res
      .status(201)
      .json({ message: "Thêm tài khoản thành công", account: newAccount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// 2. Lấy tất cả tài khoản (Read)
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().select("-password");
    return res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// 3. Lấy thông tin tài khoản theo ID (Read)
export const getAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id).select("-password");
    if (!account) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    return res.status(200).json(account);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// 4. Cập nhật thông tin tài khoản (Update)
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { username, email, phone, address, role } = req.body;

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { username, email, phone, address, role },
      { new: true } // Trả về bản cập nhật mới
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    return res
      .status(200)
      .json({ message: "Cập nhật thành công", account: updatedAccount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// 5. Xóa tài khoản (Delete)
export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    return res.status(200).json({ message: "Tài khoản đã bị xóa" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

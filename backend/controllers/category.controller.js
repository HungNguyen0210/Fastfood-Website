import Category from "../models/category.model.js";

// Tạo mới danh mục
export const createCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return res.status(400).json({ message: "Danh mục đã tồn tại" });

    const newCategory = new Category({
      name,
      status,
    });

    await newCategory.save();
    res
      .status(201)
      .json({ message: "Tạo danh mục thành công", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy tất cả danh mục
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Lấy danh sách danh mục thành công", categories });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    res.status(200).json({ message: "Lấy danh mục thành công", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true } // Trả về bản cập nhật mới
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    res.status(200).json({
      message: "Cập nhật danh mục thành công",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    res.status(200).json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

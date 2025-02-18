import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      sellprice,
      category,
      description,
      isAvailable,
    } = req.body;

    const existingProduct = await Product.findOne({ name, category });
    if (existingProduct)
      return res.status(400).json({ message: "Sản phẩm đã tồn tại" });

    const newProduct = new Product({
      name,
      image,
      price,
      sellprice,
      category,
      description,
      isAvailable,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Lấy danh sách sản phẩm thành công",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category");
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ message: "Lấy sản phẩm thành công", product });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ message: "Lấy sản phẩm thành công", product });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      sellprice,
      category,
      description,
      isAvailable,
    } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, image, price, sellprice, category, description, isAvailable },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Cập nhật thành công", product: updateProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

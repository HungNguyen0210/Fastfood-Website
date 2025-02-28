import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, sellPrice, category, description, isAvailable } =
      req.body;
    const image = req.file ? req.file.filename : req.body.image;

    const existingProduct = await Product.findOne({ name, category });
    if (existingProduct)
      return res
        .status(400)
        .json({ success: false, message: "Sản phẩm đã tồn tại" });

    const newProduct = new Product({
      name,
      image,
      price,
      sellPrice,
      category,
      description,
      isAvailable,
    });

    await newProduct.save();

    const imageUrl = image ? `http://localhost:5000/assets/${image}` : null;

    res.status(201).json({
      success: true,
      product: {
        ...newProduct.toObject(),
        image: imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category");

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không có sản phẩm nào" });
    }

    const productsWithImage = products.map((product) => {
      const imageUrl = product.image
        ? `http://localhost:5000/assets/${product.image}`
        : null;
      return { ...product.toObject(), image: imageUrl };
    });

    res.status(200).json({
      success: true,
      data: productsWithImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    const imageUrl = product.image
      ? `http://localhost:5000/assets/${product.image}`
      : null;

    res.status(200).json({
      success: true,
      data: { ...product.toObject(), image: imageUrl },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    console.log("Received PUT request for product:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { name, price, sellPrice, category, description, isAvailable } =
      req.body;

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    let updatedImage = existingProduct.image;

    if (req.file) {
      updatedImage = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image: updatedImage,
        price,
        sellPrice,
        category,
        description,
        isAvailable,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi server", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm!" });
    }
    res.json({ success: true, message: "Sản phẩm đã bị xóa!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi xóa sản phẩm!", error });
  }
};
export const getProductByIsAvailable = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: 1 })
      .sort({ createdAt: -1 })
      .populate("category");

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào phù hợp",
      });
    }

    // Cập nhật đường dẫn hình ảnh sản phẩm
    const productsWithImage = products.map((product) => {
      const imageUrl = product.image
        ? `http://localhost:5000/assets/${product.image}`
        : null;
      return { ...product.toObject(), image: imageUrl };
    });

    res.status(200).json({
      success: true,
      data: productsWithImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

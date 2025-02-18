import Product from "../models/product.model.js";
import { upload } from "../middleware/multer.js";

export const createProduct = async (req, res) => {
  // Sử dụng Multer để tải ảnh
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      // Lấy thông tin sản phẩm từ body của request
      const { name, price, sellprice, category, description, isAvailable } =
        req.body;
      // Lấy tên ảnh từ multer (nếu có)
      const image = req.file ? req.file.filename : req.body.image; // Lưu tên tệp ảnh

      // Kiểm tra xem sản phẩm đã tồn tại chưa
      const existingProduct = await Product.findOne({ name, category });
      if (existingProduct)
        return res.status(400).json({ message: "Sản phẩm đã tồn tại" });

      // Tạo sản phẩm mới
      const newProduct = new Product({
        name,
        image, // Lưu tên tệp ảnh
        price,
        sellprice,
        category,
        description,
        isAvailable,
      });

      // Lưu sản phẩm vào cơ sở dữ liệu
      await newProduct.save();

      // Tạo đường dẫn đầy đủ cho ảnh
      const imageUrl = newProduct.image
        ? `http://localhost:5000/assets/${newProduct.image}`
        : null;

      // Trả về sản phẩm đã tạo với đường dẫn ảnh đầy đủ
      res.status(201).json({
        message: "Sản phẩm đã được tạo thành công",
        product: {
          ...newProduct.toObject(),
          image: imageUrl, // Thêm đường dẫn ảnh đầy đủ
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", message: error });
    }
  });
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    }

    // Duyệt qua các sản phẩm và thêm đường dẫn đầy đủ cho ảnh
    const productsWithImage = products.map((product) => {
      // Chỉnh sửa đường dẫn ảnh thành đường dẫn đầy đủ
      const imageUrl = product.image
        ? `http://localhost:5000/assets/${product.image}`
        : null;
      return { ...product.toObject(), image: imageUrl }; // Trả về sản phẩm với đường dẫn ảnh đầy đủ
    });

    res.status(200).json({
      message: "Lấy sản phẩm thành công",
      products: productsWithImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", message: error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id)
      .sort({ createdAt: -1 })
      .populate("category");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    }

    // Duyệt qua các sản phẩm và thêm đường dẫn đầy đủ cho ảnh
    const productsWithImage = products.map((product) => {
      // Chỉnh sửa đường dẫn ảnh thành đường dẫn đầy đủ
      const imageUrl = product.image
        ? `http://localhost:5000/assets/${product.image}`
        : null;
      return { ...product.toObject(), image: imageUrl }; // Trả về sản phẩm với đường dẫn ảnh đầy đủ
    });

    res.status(200).json({
      message: "Lấy sản phẩm thành công",
      products: productsWithImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateProduct = async (req, res) => {
  // Xử lý upload file nếu có
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        name,
        price,
        sellprice,
        category,
        description,
        isAvailable,
        image,
      } = req.body;

      // Tìm sản phẩm cần cập nhật
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      // Nếu có file ảnh mới, lấy tên file từ multer, nếu không thì giữ nguyên ảnh cũ hoặc cập nhật từ req.body
      const updatedImage = req.file
        ? req.file.filename // Nếu có file upload, lấy filename từ multer
        : image || existingProduct.image; // Nếu không có file, giữ nguyên hoặc lấy từ req.body

      // Cập nhật sản phẩm
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          image: updatedImage,
          price,
          sellprice,
          category,
          description,
          isAvailable,
        },
        { new: true }
      );

      res.status(200).json({
        message: "Cập nhật thành công",
        product: {
          ...updatedProduct.toObject(),
          image: `http://localhost:5000/assets/${updatedProduct.image}`, // Trả về URL đầy đủ
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }
    res.json({ message: "Sản phẩm đã bị xóa!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm!", error });
  }
};

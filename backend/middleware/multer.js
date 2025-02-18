import multer from "multer";
import path from "path";

// Cấu hình lưu trữ và tên tệp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/backend/assets/"); // Lưu trữ trong thư mục 'uploads'
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Thêm timestamp vào tên tệp để tránh trùng lặp
    cb(null, fileName);
  },
});

// Kiểm tra loại tệp (chỉ cho phép hình ảnh)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Chỉ chấp nhận hình ảnh");
  }
};

// Tạo middleware Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn dung lượng tệp: 10MB
  fileFilter: fileFilter,
});

export default upload;

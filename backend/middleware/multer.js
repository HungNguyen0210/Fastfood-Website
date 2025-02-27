import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Import thư viện file system

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../assets"),
  filename: (req, file, cb) => {
    let filePath = path.join(__dirname, "../assets", file.originalname);

    // Nếu file đã tồn tại, thêm hậu tố `_new`
    let count = 1;
    while (fs.existsSync(filePath)) {
      const ext = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, ext);
      filePath = path.join(
        __dirname,
        "../assets",
        `${fileName}_${count}${ext}`
      );
      count++;
    }

    cb(null, path.basename(filePath)); // Trả về tên file mới
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) =>
    cb(null, ["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)),
});

import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./src/assets");
  },
  filename(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const imageFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Vui lòng tải lên định dạng ảnh";
    cb(null, false);
  }
  cb(null, true);
};

export default storage;

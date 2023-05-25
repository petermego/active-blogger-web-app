const multer = require("multer");
const path = require("path");
const imagesExtension = ["image/png", "image/jpg", "image/jpeg"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (imagesExtension.includes(file.mimetype)) {
    callback(null, true);
  } else callback("Invalid File Format", false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

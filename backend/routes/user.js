const { body } = require("express-validator");
const router = require("express").Router();
const loginController = require("../controllers/login");
const upload = require("../utils/multer");
const handleMulterError  = require("../middleware/multer-error");

const userController = require("../controllers/user");

router.post(
  "/user/upload-img/",
  upload.single("image"),
  handleMulterError,
  userController.postUserImg
);

module.exports = router;
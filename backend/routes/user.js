const { body } = require("express-validator");
const router = require("express").Router();
const loginController = require("../controllers/login");
const upload = require("../utils/multer");
const {isAuth} = require("../middleware/isAuth");
const handleMulterError  = require("../middleware/multer-error");

const userController = require("../controllers/user");

router.post(
  "/user/upload-img/",
  upload.single("image"),
  handleMulterError,
  userController.postUserImg
);

router.get("/auth", isAuth);

router.post(
  "/user/post",
  upload.single("image"),
  handleMulterError,
  userController.postUserExperience
);

module.exports = router;
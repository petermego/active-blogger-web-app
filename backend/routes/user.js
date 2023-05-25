const { body } = require("express-validator");
const router = require("express").Router();
const loginController = require("../controllers/login");
const upload = require("../utils/multer");
const {isAuth} = require("../middleware/isAuth");
const handleMulterError  = require("../middleware/multer-error");

const userController = require("../controllers/user");

router.post(
  "/user/upload-img/",
  isAuth,
  upload.single("image"),
  handleMulterError,
  userController.postUserImg
);

router.get("/auth", isAuth);

router.post(
  "/user/share-blog",
  isAuth,
  upload.single("file"),
  handleMulterError,
  userController.postBlog
);

router.post(
  "user/share-experience",
  upload.single("file"),
  isAuth,
  userController.postExperience
);

module.exports = router;
const { body } = require("express-validator");
const router = require("express").Router();
const loginController = require("../controllers/login");

router.post(
  "/sign-in",
  [
    body("email").trim().isEmail().normalizeEmail()
  ],
  loginController.getAccount
);

module.exports = router;

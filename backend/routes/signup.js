const { body } = require("express-validator");
const router = require("express").Router();
const signUpController = require('../controllers/signup');

router.post(
  "/sign-up",
  [
    body("fname").trim().isLength({ min: 3 }),
    body("lname").trim().isLength({ min: 3 }),
    body("username").trim().isLength({ min: 6 }),
    body("email").trim().isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  signUpController.postUser
);

module.exports = router;
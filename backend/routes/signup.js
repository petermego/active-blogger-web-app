const { body } = require("express-validator");
const router = require("express").Router();
const signUpController = require('../controllers/signup');
const rateLimit = require("express-rate-limit");

const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/sign-up",
  [
    body("fname").trim().isLength({ min: 3 }),
    body("lname").trim().isLength({ min: 3 }),
    body("username").trim().isLength({ min: 6 }),
    body("email").trim().isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  accountLimiter,
  signUpController.postUser
);

module.exports = router;
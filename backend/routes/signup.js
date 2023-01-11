const { body } = require("express-validator");
const router = require("express").Router();
const signUpController = require('../controllers/signup');

router.get("/sign-up", (req, res) => {
  res.status(200).json({ greeting: "hello" });
});

router.post(
  "/sign-up",
  [
    body("first-name").trim().isLength({ min: 3 }),
    body("email").trim().isEmail().normalizeEmail(),
    body("last-name").trim().isLength({ min: 3 }),
    body("username").trim().isLength({ min: 6 }),
    body("password").isLength({ min: 8 })
  ],
  signUpController.postUser
);


module.exports = router;
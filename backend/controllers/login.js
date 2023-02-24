const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (!user.length) {
      return res.status(200).json({ error: true, message: "you did not sign up yet..." });
    }
    const userData = user[0];
    bcrypt.compare(password, userData.password)
      .then(doMatch => {
        if (doMatch) {
          const tokenSecret = process.env.JWT_TOKEN_SECRET;
          const token = jwt.sign({
              user: userData.id
            },
            tokenSecret,
            { expiresIn: '30d' }
          );
          return res.status(201).json({ error: false, token, user: userData });
        }
        return res.status(200).json({ error: true, message: "your email or password is not valid" });
      });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};

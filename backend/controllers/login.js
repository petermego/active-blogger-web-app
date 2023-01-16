const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.getAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    User.findUserByEmail(email)
      .then(([row]) => {
        if (!row.length) {
          return res.status(400).json({ error: true, message: "you did not sign up yet..." });
        }
        if (row[0].password !== password) {
          return res.status(400).json({ error: true, message: "your email or password is not valid" });
        }
        return res.status(200).json({ error: false });
      })
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

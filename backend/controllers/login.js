const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
          return res.status(200).json({ error: true, message: "you did not sign up yet..." });
        }
        bcrypt.compare(password, row[0].password)
          .then(doMatch => {
            if (doMatch) {
              const tokenSecret = process.env.JWT_TOKEN_SECRET;
              const token = jwt.sign({
                user: row[0]
              },
              tokenSecret,
              {expiresIn: '10s'}
              );
              return res.status(201).json({ error: false, token, user: row[0] });
            }
            return res.status(200).json({ error: true, message: "your email or password is not valid" });
          });
      }).catch(error => console.log(error));
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

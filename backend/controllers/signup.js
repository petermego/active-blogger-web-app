const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array();
    let message = "invalid value at ";
    switch (validationErrors[0].param) {
      case "fname": {
        message += "first name.";
        break;
      }
      case "lname": {
        message += "last name.";
        break;
      }
      case "username": {
        message += "username.";
        break;
      }
      case "email": {
        message += "email.";
        break;
      }
      case "password": {
        message += "password.";
        break;
      }
      default: {
        break;
      }
    }
    return res.status(200).json({ error: true, message });
  }
  try {
    const { fname, lname, username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    User.findUserByEmail(email)
      .then(([row]) => {
        if (!row.length) {
          const date = new Date().toISOString().slice(0, 19).replace("T", " ");
          const user = new User(fname, lname, email, hashedPassword, username, date);
          user.save();
          const tokenSecret = process.env.JWT_TOKEN_SECRET;
          const token = jwt.sign(
            {
              user: row[0],
            },
            tokenSecret,
            { expiresIn: "30d" }
          );
          return res.status(201).json({ error: false, user, token });
        }
        return res.status(200).json({ error: true, message: "this E-mail is used, Please make a new one." });
      })
  } catch(error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};
const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.postUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, errors: errors.array() });
  }
  try {
    const { fname, lname, username, email, password } = req.body;
    User.findUserByEmail(email)
      .then(([raw]) => {
        if (!raw.length) {
          const date = new Date().toISOString().slice(0, 19).replace("T", " ");
          const user = new User(fname, lname, email, password, username, date);
          user.save();
          return res.status(201).json({ error: false, message: "signed up successfuly" });
        }
        return res.status(400).json({ error: true, message: "this E-mail is used, Please make a new one." });
      })
  } catch(error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

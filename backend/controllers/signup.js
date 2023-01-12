const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.postUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fname, lname, username, email, password } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  const user = new User(fname, lname, email, password, username, date);
  user.save();
  const message = "signed up successfuly";
  return res.status(201).json({message});
};

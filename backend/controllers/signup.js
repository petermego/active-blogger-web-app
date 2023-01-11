const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.postUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

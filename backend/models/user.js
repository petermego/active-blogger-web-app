const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  friends: {
    type: [Object],
    default: [],
  },
  blogs: {
    type: [Object],
    default: [],
    ref: "Blog",
  },
  imagePath: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  user: {
    type: user,
    required: true,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [user],
    ref: "User",
    default: [],
  }
});

module.exports = mongoose.model("Blog", blogSchema);
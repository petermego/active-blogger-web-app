const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  user: {
    type: Object,
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
    type: [Object],
    ref: "User",
    default: [],
  }
});

module.exports = mongoose.model("Blog", blogSchema);
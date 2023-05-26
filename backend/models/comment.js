const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
});

module.exports = mongoose.model("Comment", commentSchema);

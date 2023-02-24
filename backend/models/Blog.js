const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Blog", blogSchema);
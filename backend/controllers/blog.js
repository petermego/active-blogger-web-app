const Blog = require('../models/Blog');
const User = require("../models/user");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ isVisible: true }).sort({ createdAt: 'desc' }).populate('user');
  return await res.status(200).json(blogs);
};
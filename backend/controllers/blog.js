const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find.sort({ createdAt: -1 });
  res.status(200).json(blogs);
};
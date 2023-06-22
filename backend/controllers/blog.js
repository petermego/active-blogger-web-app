const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: 'desc' });
  return res.status(200).json(blogs);
};
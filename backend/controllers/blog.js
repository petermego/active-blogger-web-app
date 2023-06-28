const Blog = require('../models/Blog');
const User = require("../models/user");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ isVisible: true }).sort({ createdAt: 'desc' }).populate('user');
  return await res.status(200).json(blogs);
};

exports.addLike = async (req, res) => {
  const { blogId, userId } = req.body;
  const blog = await Blog.findById(blogId);
  blog.likes.push(userId);
  blog.save();
  return await res.sendStatus(201);
};

exports.removeLike = async (req, res) => {
  const { blogId, userId } = req.body;
  await Blog.findById(blogId, async (err, blog) => {
    if (err) {
      console.log(err);
      return;
    }
    blog.likes = blog.likes.filter(blog => blog.user !== userId);
    await blog.save();
  }).clone();
  return await res.sendStatus(201);
};
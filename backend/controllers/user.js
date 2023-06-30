const User = require("../models/user");
const Blog = require("../models/Blog");

exports.postUserImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "user image not provided." });
    }
    const userId = req.params.id;
    const imagePath = "upload/" + req.file.filename;
    const user = await User.findById(userId)
      .catch(err => console.log(err));
    user.imagePath = imagePath;
    user.save()
      .catch(err => console.log(err));
    return res.status(201).json({ error: false, user });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};

// for blog that contain files
exports.postBlog = async (req, res) => {
  try {
    const imagePath = "upload/" + req.file.filename;
    const blogData = JSON.parse(req.body.blog);
    const blog = new Blog({
      user: blogData.user._id,
      body: blogData.body,
      image: imagePath,
      createdDate: blogData.createdDate,
    });
    await blog.save()
      .catch(err => console.log(err));
    const user = await User.findById(blogData.user._id);
    user.blogs.push(blog);
    user.save()
      .catch(err => console.log(err));
    return res.status(201).json({ error: false, message: "uploaded successfully!", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};

// for blog that not contain files
exports.postExperience = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blog);
    const blog = new Blog({
      user: blogData.user._id,
      body: blogData.body,
      createdDate: blogData.createdDate,
    });
    await blog.save()
      .catch(err => console.log(err));
    const user = await User.findById(blogData.user._id);
    user.blogs.push(blog);
    user.save()
      .catch(err => console.log(err));
    return res.status(201).json({ error: false, message: "uploaded successfully!", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};
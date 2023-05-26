const User = require("../models/user");
const Blog = require("../models/Blog");

exports.postUserImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "user image not provided." });
    }
    const userId = req.params.id;
    const imagePath = "upload/" + req.file.filename;
    console.log(imagePath);
    const updatedUser = await User.findByIdAndUpdate(userId, { imagePath }, { new: true })
      .catch(err => console.log(err));
    return res.status(201).json({ error: false, imagePath });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};

// for blog that contain files
exports.postBlog = (req, res) => {
  try {
    const imagePath = "upload/" + req.file.filename;
    const blogData = JSON.parse(req.body.blog);
    const blog = new Blog({
      user: blogData.user,
      body: blogData.body,
      image: imagePath,
      createdDate: blogData.createdDate,
      likes: []
    });
    blog.save()
      .catch(err => console.log(err));
    return res.status(201).json({ error: false, message: "uploaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};
//TODO
// for blog that not contain files
exports.postExperience = (req, res) => {

};
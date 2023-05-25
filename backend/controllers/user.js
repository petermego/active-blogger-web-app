const User = require("../models/user");

exports.postUserImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "user image not provided." });
    }
    const { id } = req.body;
    const imagePath = "upload/" + req.file.filename;
    console.log(imagePath);
    const user = await User.findById(id);
    user.imagePath = imagePath;
    await user.save()
      .catch(err => console.log(err));
    return res.status(201).json({ error: false, imagePath });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};

// TODO
// for blog that contain files
exports.postBlog = (req, res) => {
  try {
    const imagePath = "upload/" + req.file.filename;
    const { blog } = req.body;
    console.log(blog);
    console.log(imagePath);
    return res.status(201).json('uploaded successfully!');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error", error });
  }
};
//TODO
// for blog that not contain files
exports.postExperience = (req, res) => {

};
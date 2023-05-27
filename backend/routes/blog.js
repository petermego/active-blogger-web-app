const router = require("express").Router();

const blogController = require("../controllers/blog");

router.get('/all-blogs', blogController.getAllBlogs);

module.exports = router;
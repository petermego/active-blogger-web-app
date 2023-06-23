const router = require("express").Router();

const {isAuth} = require("../middleware/isAuth");

const blogController = require("../controllers/blog");

router.get('/all-blogs', isAuth, blogController.getAllBlogs);

module.exports = router;
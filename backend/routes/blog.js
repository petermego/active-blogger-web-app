const router = require("express").Router();

const {isAuth} = require("../middleware/isAuth");

const blogController = require("../controllers/blog");

router.get('/all-blogs', isAuth, blogController.getAllBlogs);

router.post("/add-like", isAuth, blogController.addLike);

router.post("/remove-like", isAuth, blogController.removeLike);

module.exports = router;
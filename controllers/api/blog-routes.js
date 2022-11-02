const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");

// GET all blogs for homepage
router.post("/comment", async (req, res) => {
  try {
    const comment = req.body.comment;
    const blogId = req.body.blogId;
    const userId = req.session.user_id; // need to add userId to session token

    // console.log(comment, blogId, userId);

    if (blogId && comment && userId) {
      await Comment.create({
        content: comment,
        user_id: userId,
        blog_id: blogId,
      });

      res.status(200).replace("/blog/" + blogId);
    } else {
      res.status(404).json({ messsage: "Please provide email and password!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Error, please try again!" });
  }
});

module.exports = router;

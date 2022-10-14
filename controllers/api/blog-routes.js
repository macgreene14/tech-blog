const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");

// GET all blogs for homepage
router.get("/", async (req, res) => {
  try {
    const blog_data = await Blog.findAll({
      include: [
        {
          model: User,
        },
        { model: Comment },
      ],
    });

    // Convert to JSON
    // const galleries = dbGalleryData.map((gallery) =>
    //   gallery.get({ plain: true })
    // );

    res.status(200).json(blog_data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

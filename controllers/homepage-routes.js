const router = require("express").Router();
const path = require("path");
const { Blog, User, Comment } = require("../models");

// GET all blogs for homepage
router.get("/", async (req, res) => {
  try {
    // query db for blogData
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
        },
        { model: Comment },
      ],
    });

    // format raw data as json object
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

    // insert parse blog data and insert into homepage
    res.render("homepage", { blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog by id
router.get("/blog/:id", async (req, res) => {
  try {
    // access path param
    const id = req.params.id;

    // query db for blogData
    const blogData = await Blog.findByPk(id, {
      include: [{ all: true, nested: true }],
    });

    // format raw data as json object
    const blog = blogData.get({ plain: true });
    console.log(blog);

    const comments = blog.comments;
    console.log(comments);

    res.render("blogpage", { blog, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

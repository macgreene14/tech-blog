const router = require("express").Router();
const path = require("path");
const { Blog, User, Comment } = require("../models");
const bcrypt = require("bcrypt"); // for password hashing

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

    // obtain user_id
    const loggedIn = req.session.loggedIn;

    // insert parse blog data and insert into homepage
    res.render("homepage", { blogs, loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog by id
router.get("/blog/:id", async (req, res) => {
  try {
    // if user is not logged in, redirect to login
    const loggedIn = req.session.loggedIn;

    // obtain user_id from session entry to lookup blogs
    const user_id = req.session.user_id;

    if (!loggedIn || !user_id) {
      res.status(200).redirect("/login");
    }

    // access path param
    const id = req.params.id;

    // query db for blogData
    const blogData = await Blog.findByPk(id, {
      include: [{ all: true, nested: true }],
    });

    // format raw data as json object
    const blog = blogData.get({ plain: true });
    const comments = blog.comments;

    res.render("blogpage", { blog, comments, loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs belonging to user
router.get("/dashboard", async (req, res) => {
  try {
    // if user is not logged in, redirect to login
    const loggedIn = req.session.loggedIn;

    // obtain user_id from session entry to lookup blogs
    const user_id = req.session.user_id;

    if (!loggedIn || !user_id) {
      res.status(200).redirect("/login");
      return;
    }

    // query db for blogData
    const blogData = await Blog.findAll({
      where: { user_id: user_id },
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
    // find all blog posts belonging to user, render to dashboard
    res.render("dashboard", { blogs, loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET user login
router.get("/login", (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET new user signup
router.get("/signup", async (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Error, please try again!" });
  }
});

// GET new blog post
router.get("/new-blog", async (req, res) => {
  try {
    res.status(200).render("newblog");
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Error, please try again!" });
  }
});

module.exports = router;

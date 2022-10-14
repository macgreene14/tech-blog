const router = require("express").Router();
const axios = require("axios");
const path = require("path");

// const { Blog, User } = require("../models");

// GET all blogs for homepage
router.get("/", async (req, res) => {
  try {
    // call api for db entries
    const uri = "http://" + req.get("host") + "/api/blog";
    const axios_res = await axios.get(uri);
    const blogs = axios_res.data;

    // insert parse blog data and insert into homepage
    res.render("homepage", { blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

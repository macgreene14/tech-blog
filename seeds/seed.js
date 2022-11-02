const sequelize = require("../config/connection");

const { Blog, User, Comment } = require("../models");

const userData = require("./userData.json");
const commentData = require("./commentData.json");
const blogData = require("./blogData.json");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await User.create(userData);
    console.log("\n----- USER SEEDED -----\n");

    await Blog.bulkCreate(blogData);
    console.log("\n----- BLOG SEEDED -----\n");

    await Comment.bulkCreate(commentData);
    console.log("\n----- COMMENT SEEDED -----\n");
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedAll();

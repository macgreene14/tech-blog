const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

// User belongs to Blog (hasOne)
Blog.hasOne(User, { foriegnKey: "user_id" });

User.belongsTo(Blog, { foriegnKey: "user_id" });

// Comment belongs to Blog (hasMany)
Blog.hasMany(Comment, { foriegnKey: "comment_id" });

Comment.belongsTo(Blog, { foriegnKey: "borrower_id" });

module.exports = { Blog, User, Comment };

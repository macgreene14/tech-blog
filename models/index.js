const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

// // User belongs to Blog (hasOne)
// Blog.belongsTo(User, { foriegnKey: "user_id" });
// User.hasOne(Blog, { foriegnKey: "user_id" });

// // Comment belongs to Blog (hasMany)
// Blog.belongsTo(Comment, { foriegnKey: "comment_id" });
// Comment.hasMany(Blog, { foriegnKey: "comment_id" });

// A user can have many comments, but a comment can have only one user
// Store user_id as FK in comments
Comment.belongsTo(User, { foriegnKey: "user_id" });
User.hasMany(Comment, { foriegnKey: "user_id" });

// A user can have many blogs, but a blog can have only one user
// Store user_id as FK in blog
Blog.belongsTo(User, { foriegnKey: "user_id" });
User.hasMany(Blog, { foriegnKey: "user_id" });

// A blog can have many comments, but a comment can only have one blog
// Store blog_id as FK in comments
Comment.belongsTo(Blog, { foriegnKey: "blog_id" });
Blog.hasMany(Comment, { foriegnKey: "blog_id" });

module.exports = { Blog, User, Comment };

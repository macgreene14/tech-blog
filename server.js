const express = require("express");
const sequelize = require("./config/connection");
const controllers = require("./controllers");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use(controllers); // route to controllers path

// sync sequelize models to the database, then turn on the server and start listening
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
// });

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});

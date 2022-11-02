const express = require("express");
const sequelize = require("./config/connection");
const controllers = require("./controllers");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// require("dotenv").config(); //process.env.SESS_SECRET

// require handlerbars.js
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers }); // register custom handlebars helpers
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// setup sessions with cookies
const sess = {
  secret: "secret",
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // expose public folder
app.use(controllers); // route to controllers path

// sync sequelize models to the database, then turn on the server and start listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});

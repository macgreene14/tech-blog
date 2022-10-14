const router = require("express").Router();
const uiRoutes = require("./ui");
const apiRoutes = require("./api");

// route root resources to uiRoutes
router.use("/", uiRoutes);

// route request for information to apiRoutes
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;

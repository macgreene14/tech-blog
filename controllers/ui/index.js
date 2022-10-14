const router = require("express").Router();
const homepageRoutes = require("./homepage-routes");
// const dashboardRoutes = require("./dashboard-routes");

router.use("/homepage", homepageRoutes);
// router.use("/dashboard", dashboardRoutes);

module.exports = router;

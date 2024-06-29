const express = require("express");
const UsersRoutes = require("./UsersRoutes");
const StopsRoutes = require("./StopsRoutes");

const router = express.Router();

router.use("/users", UsersRoutes);
router.use("/stops", StopsRoutes);

module.exports = router;

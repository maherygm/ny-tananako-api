const express = require("express");
const UsersRoutes = require("./UsersRoutes");
const StopsRoutes = require("./StopsRoutes");
const AdminRoutes = require("./AdminRoutes");
const ClientRoutes = require("./ClientRoutes");
const EvenementRoutes = require("./EvenementRoutes");
const OrderRoutes = require("./OrderRoutes");
const PaymentRoutes = require("./PayementRoutes");

const router = express.Router();

router.use("/admins", AdminRoutes);
router.use("/Client", ClientRoutes);
router.use("/Evenement", EvenementRoutes);
router.use("/orders", OrderRoutes);
router.use("/Payement", PaymentRoutes);

router.use("/users", UsersRoutes);
router.use("/stops", StopsRoutes);

module.exports = router;

const express = require("express");
const PayerController = require("../controllers/payementController");
const router = express.Router();

router.get("/hello", PayerController.hello);
router.post("/", PayerController.stripe);
router.get("/success", PayerController.success);
router.get("/cancel", PayerController.cancel);

module.exports = router;

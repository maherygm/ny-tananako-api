const express = require("express");

const StopsController = require("../controllers/stopsController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", StopsController.getAllStops);
router.get("/:stopId", StopsController.getStopsById);
router.post("/", StopsController.createStop);
router.put("/:stopId", StopsController.updateStop);
router.delete("/:stopId", StopsController.deleteStop);

module.exports = router;

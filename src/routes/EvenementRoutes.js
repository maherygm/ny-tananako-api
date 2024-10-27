const express = require("express");
const EvenementController = require("../controllers/evenementController");
const router = express.Router();

router.get("/", EvenementController.getAllEvenements);
router.get("/:id", EvenementController.getEvenementById);
router.post("/", EvenementController.createEvenement);
router.put("/:id", EvenementController.updateEvenement);
router.delete("/:id", EvenementController.deleteEvenement);

module.exports = router;

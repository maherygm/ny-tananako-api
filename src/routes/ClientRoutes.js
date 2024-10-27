const express = require("express");
const ClientController = require("../controllers/clientController");
const router = express.Router();

router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClientById);
router.post("/", ClientController.createClient);
router.put("/:id", ClientController.updateClient);
router.delete("/:id", ClientController.deleteClient);

module.exports = router;

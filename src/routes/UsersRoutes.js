const express = require("express");

const UsersController = require("../controllers/usersController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", UsersController.getAllUsers);
router.get("/:UsersId", UsersController.getUserById);
router.post("/", UsersController.createUser);
router.post("/login", UsersController.getUserByCredentials);
router.put("/:UsersId", UsersController.updateUsers);
router.delete("/:UsersId", UsersController.deleteUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login-user", UserController.login);
router.post("/user-data", UserController.userData);
// Add other user routes here

module.exports = router;
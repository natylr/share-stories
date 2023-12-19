const express = require("express");
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login-user", UserController.login);
router.post("/user-data",verifyJWT, UserController.userData);
router.put("/update-profile",verifyJWT, UserController.updateProfile);
router.put("/change-password",verifyJWT, UserController.changePassword);

module.exports = router;

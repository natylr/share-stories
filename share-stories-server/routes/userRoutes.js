const express = require("express");
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const UserController = require("../controllers/UserController");
const upload = require('multer')();

router.post("/register", upload.single('avatar'), UserController.register);
router.post("/login-user", UserController.login);
router.post("/user-data",verifyJWT, UserController.userData);
router.put("/update-profile", verifyJWT, upload.single('avatar'), UserController.updateProfile);
router.put("/change-password",verifyJWT, UserController.changePassword);

module.exports = router;

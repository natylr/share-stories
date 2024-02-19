const express = require("express");
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const UserController = require("../controllers/UserController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/register", upload.single('avatar'), UserController.register);
router.post("/login-user", UserController.login);
router.post("/user-data",verifyJWT, UserController.userData);
router.put("/update-profile", verifyJWT, upload.single('avatar'), UserController.updateProfile);
router.put("/change-password",verifyJWT, UserController.changePassword);
router.get('/reset', UserController.resetUserSchema)
module.exports = router;

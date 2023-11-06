const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/StoryController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/cards", StoryController.getCards);
router.post("/add_story", upload.single('mainImage'), StoryController.addStory);
router.delete("/delete_story", StoryController.deleteStoryByTitle)

module.exports = router;
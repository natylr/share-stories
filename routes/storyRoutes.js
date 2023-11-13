const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/StoryController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/cards", StoryController.getCards);
router.post("/add_story", upload.single('mainImage'), StoryController.addStory);
router.post("/my_cards", StoryController.getMyCards)
router.delete("/delete_story", StoryController.deleteStoryByTitle)
router.put("/update_story", upload.single('mainImage'), StoryController.updateStory); // Add this line


module.exports = router;

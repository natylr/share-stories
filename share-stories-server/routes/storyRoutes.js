const express = require("express");
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const StoryController = require("../controllers/StoryController");

router.get("/cards", StoryController.getCards);
router.post("/add_story", verifyJWT, upload.single('mainImage'), StoryController.addStory);
router.post("/my_cards", verifyJWT, StoryController.getMyCards);
router.delete("/delete_story", verifyJWT, StoryController.deleteStoryByTitle); 
router.put("/update_paragraphs", verifyJWT, upload.array('updatedImages'), StoryController.updateParagraphs);
router.get("/get_story", StoryController.getStoryByTitle);
module.exports = router;
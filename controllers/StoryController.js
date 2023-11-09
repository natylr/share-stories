const mongoose = require("mongoose");
const Story = mongoose.model("StoryDetails");
const { userDataByToken } = require('./UserController');

const getCards = async (req, res) => {
  try {
    const cards = await Story.find({}, 'title mainImageUrl');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyCards = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await userDataByToken(token);
    const cards = await Story.find({ creatorId: user.data.userId }, 'title mainImageUrl');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStory = async (req, res) => {
  const { creatorId, title } = req.body;
  let mainImageUrl = null;

  if (req.file) {
    mainImageUrl = req.file.path;
  }

  try {
    const newStory = new Story({
      creatorId,
      title,
      mainImageUrl,
    });
    const savedStory = await newStory.save();

    res.json(savedStory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStoryByTitle = async (req, res) => {
  try {
    const { title, token } = req.body;
    const user = await userDataByToken(token);
    const userId = user.data.userId;

    const story = await Story.findOne({ title: title, userId: userId }); // Find by both title and userId

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    const result = await Story.deleteOne({ title: title, userId: userId });
    
    if (story.mainImageUrl) {
      // Delete the image file from the server
      const fs = require('fs');
      fs.unlink(story.mainImageUrl, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        } else {
          console.log('Image file deleted successfully');
        }
      });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const resetStorySchema = async (req, res) => {
  try {
    const result = await Story.deleteMany({});
    return res.json({ message: "Schema reset successful", deletedCount: result.deletedCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCards, addStory, resetStorySchema, deleteStoryByTitle, getMyCards
};
const mongoose = require("mongoose");
const Story = mongoose.model("StoryDetails");
const { userDataByToken } = require('./UserController');
const fs = require('fs');

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
  const { token, title } = req.body;
  const user = await userDataByToken(token);
  const userId = user.data.userId;

  const story = await Story.findOne({ title: title, creatorId: userId }); // Find by both title and userId

  if (story) {
    return res.json({ error: "User Exists" });
  }

  let mainImageUrl = null;

  if (req.file) {
    mainImageUrl = req.file.path;
  }

  try {
    const newStory = new Story({
      creatorId :userId,
      title,
      mainImageUrl,
    });
    const savedStory = await newStory.save();

    res.json(savedStory);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const deleteStoryByTitle = async (req, res) => {
  try {
    const { title, token } = req.body;
    const user = await userDataByToken(token);
    const userId = user.data.userId;

    const story = await Story.findOne({ title: title, creatorId: userId }); // Find by both title and userId

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    const result = await Story.deleteOne({ title: title, creatorId: userId });

    if (story.mainImageUrl) {
      // Delete the image file from the server
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

const updateParagraphs = async (req, res) => {
  const { title, token, paragraphs } = req.body;
  console.log(paragraphs)
  console.log(req.files)
  try {
    const user = await userDataByToken(token);
    const creatorId = user.data.userId;

    const existingStory = await Story.findOne({title, creatorId });

    if (!existingStory) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }
    existingStory.paragraphs.forEach(async (old_paragraph) => {
      if (old_paragraph.paragraphImageData) {

        try {
          await fs.promises.unlink(old_paragraph.paragraphImageData);
          console.log('Image file deleted successfully:', old_paragraph.paragraphImageData);
        } catch (error) {
          console.error('Error deleting image file:', error);
        }
      }
    });
    req.files.forEach(async (file, index) => {
      paragraphs[index].paragraphImageData = file.path;
    })
    existingStory.paragraphs = paragraphs;

    const updatedStory = await existingStory.save();

    res.json(updatedStory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getStoryByTitle = async (req, res) => {
  try {
    const { title, userId } = req.query;
    const story = await Story.findOne({ title, creatorId:userId });

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }


    res.json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
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
  getCards, addStory, deleteStoryByTitle, getMyCards, updateParagraphs, getStoryByTitle
};
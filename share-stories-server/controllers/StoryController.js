const mongoose = require("mongoose");
const Story = mongoose.model("StoryDetails");

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
    const userId = req.userId;
    const cards = await Story.find({ creatorId: userId }, 'title mainImageUrl');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStory = async (req, res) => {
  const userId = req.userId;
  const { title } = req.body;

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
      creatorId: userId,
      title,
      mainImageUrl,
    });
    const savedStory = await newStory.save();

    res.json({ status:"ok", savedStory});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const deleteStoryByTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

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
    story.paragraphs.forEach(async (paragraph) => {
      try {
        if (paragraph.paragraphImageData)
          await fs.promises.unlink(paragraph.paragraphImageData);
        console.log('Image file deleted successfully:', paragraph.paragraphImageData);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    })
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const updateParagraphs = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, updatedTextsIndex, updatedTexts, updatedImagesIndex, removedImagesIndex } = req.body;

    const updatedTextsIndexArray = updatedTextsIndex.split(',');
    const updatedTextsArray = updatedTexts.split(',');
    const updatedImagesIndexArray = updatedImagesIndex.split(',');
    const removedImagesIndexArray = removedImagesIndex.split(',');
    updatedTextsIndexArray.forEach((value, idx) => { updatedTextsIndexArray[idx] = parseInt(value) })
    updatedImagesIndexArray.forEach((value, idx) => { updatedImagesIndexArray[idx] = parseInt(value) })
    removedImagesIndexArray.forEach((value, idx) => { removedImagesIndexArray[idx] = parseInt(value) })


    const creatorId = userId;

    const existingStory = await Story.findOne({ title, creatorId });

    if (!existingStory) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    // checking if exist new paragraph without text
    if ((updatedImagesIndexArray[updatedImagesIndexArray.length - 1] > updatedTextsIndexArray[updatedTextsIndexArray.length - 1]) && (updatedImagesIndexArray[updatedImagesIndex.length - 1] > existingStory.paragraphs.length))
      return res.status(403).json({ success: false, error: 'Can not add paragraph without text' });
    updatedTextsIndexArray.forEach(paragraphIndex => {
      if (existingStory.paragraphs.length <= paragraphIndex)
        existingStory.paragraphs = [...existingStory.paragraphs, { "textData": null, "paragraphImageData": null }]
    });

    for (let paragraphIndex = 0; paragraphIndex < existingStory.paragraphs.length; paragraphIndex++) {
      // remove not old images
      const old_paragraph = existingStory.paragraphs[paragraphIndex];
      if ((updatedImagesIndexArray.includes(paragraphIndex) || removedImagesIndexArray.includes(paragraphIndex)) && old_paragraph.paragraphImageData) {
        try {
          await fs.promises.unlink(old_paragraph.paragraphImageData);
          console.log('Image file deleted successfully:', old_paragraph.paragraphImageData);
        } catch (error) {
          console.error('Error deleting image file:', error);
        }
      }
      if (updatedImagesIndexArray.includes(paragraphIndex)) {
        const index_in_array = updatedImagesIndexArray.indexOf(paragraphIndex);
        existingStory.paragraphs[paragraphIndex].paragraphImageData = req.files[index_in_array].path
      }
      if (updatedTextsIndexArray.includes(paragraphIndex))
        existingStory.paragraphs[paragraphIndex].textData = updatedTextsArray[paragraphIndex]

      if (removedImagesIndexArray.includes(paragraphIndex))
        existingStory.paragraphs[paragraphIndex].textData = null

    }
    const updatedStory = await existingStory.save();

    res.json({ ok: true, data: updatedStory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getStoryByTitle = async (req, res) => {
  try {
    const { title, userId } = req.query;
    const story = await Story.findOne({ title, creatorId: userId });

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }


    res.json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};


module.exports = {
  getCards, addStory, deleteStoryByTitle, getMyCards, updateParagraphs, getStoryByTitle
};
const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creatorId: {
    type: Number,
    required: true
  },
  title: { type: String, required: true },
  mainImageUrl: String,
  paragraphs: [
    {
      textData: {
        type: String,
        required: true
      },
      paragraphImageData: String
    }
  ],
  // additionalImages: [String]
});

module.exports = mongoose.model("StoryDetails", StorySchema);

const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creatorId: {
    type: Number,
    required: true
  },
  title: { type: String, required: true },
  mainImageUrl: String,
  paragraphs: [String],
  additionalImages: [String]
});

module.exports = mongoose.model("StoryDetails", StorySchema);
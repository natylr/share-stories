const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  creatorId : Number,
  title: String,
  mainImageUrl: String,
  text: String,
  additionalImages: [String]
});

module.exports = mongoose.model("StoryDetails", StorySchema);
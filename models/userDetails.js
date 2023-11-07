const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      required: true
    },
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);


mongoose.model("UserInfo", UserDetailsSchema);
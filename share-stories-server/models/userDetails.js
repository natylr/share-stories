const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      required: true,
    },
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    address: String, // New field for address
    city: String, // New field for city
    phone: String, // New field for phone
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
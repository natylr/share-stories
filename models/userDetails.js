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

UserDetailsSchema.pre('save', async function(next) {
  const user = this;

  if (!user.userId) {
    // Generate a random userId (you can replace this with your own logic)
    let generatedUserId = Math.floor(Math.random() * 1000000) + 1;

    // Check if generated userId already exists
    while (await mongoose.model('UserInfo').findOne({ userId: generatedUserId })) {
      generatedUserId = Math.floor(Math.random() * 1000000) + 1;
    }

    user.userId = generatedUserId;
  }

  next();
});

mongoose.model("UserInfo", UserDetailsSchema);
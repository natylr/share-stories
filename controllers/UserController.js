const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("UserInfo");


const register = async (req, res) => {
  const { fname, lname, email, password, address, city, phone } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    let generatedUserId;
    // generate unique number for user id
    do {
      generatedUserId = Math.floor(Math.random() * 1000000) + 1;
    } while (
      await mongoose.model("UserInfo").findOne({ userId: generatedUserId })
    );

    const user = new User({
      userId: generatedUserId,
      fname,
      lname,
      email,
      password: encryptedPassword,
      address,
      city,
      phone,
    });

    await user.save();

    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ status: "ok", data: token });
  } else {
    res.json({ status: "error", error: "Invalid Password" });
  }
};

// const userDataByToken = async (token) => {
//   try {
//     const user = jwt.verify(token, JWT_SECRET);
//     const useremail = user.email;
//     const userData = await User.findOne({ email: useremail });
//     return { status: "ok", data: userData };
//   } catch (error) {
//     throw new Error("Invalid Token");
//   }
// };

const userDataByUserId = async (userId) => {
  try {
    const userData = await User.findOne({ userId: userId });
    return { status: "ok", data: userData };
  } catch (error) {
    throw new Error("Invalid User ID");
  }
};

const userData = async (req, res) => {
  try {
    const userId = req.userId;
    const userDataResult = await userDataByUserId(userId);
    res.send(userDataResult);
  } catch (error) {
    res.send({ status: "error", data: "Invalid Token" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { fname, lname, address, city, phone } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Update the user's details
    user.fname = fname;
    user.lname = lname;
    user.address = address;
    user.city = city;
    user.phone = phone;

    await user.save(); // Save the updated user to the database

    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.send({ status: "error" });
  }
};

const changePassword = async (req, res) => {
  const userId = req.userId;
  const { prevPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ status: "error", error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(prevPassword, user.password);

    if (!isPasswordMatch) {
      return res.json({ status: "error", error: "Invalid previous password" });
    }

    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = encryptedNewPassword;

    await user.save();

    res.json({ status: "ok" });
  } catch (error) {
    console.error('Error changing password:', error);
    res.json({ status: "error", error: "Something went wrong" });
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
  register,
  login,
  userData,
  userDataByUserId,
  updateProfile,
  changePassword
};
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require ("../secret");

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

const userDataByToken = async (token) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    const userData = await User.findOne({ email: useremail });
    return { status: "ok", data: userData };
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

const userData = async (req, res) => {
  const { token } = req.body;
  try {
    const userDataResult = await userDataByToken(token);
    res.send(userDataResult);
  } catch (error) {
    res.send({ status: "error", data: "Invalid Token" });
  }
};

module.exports = {
  register,
  login,
  userData,
  userDataByToken
};
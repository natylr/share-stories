const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("UserInfo");

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const register = async (req, res) => {
  const { fname, lname, email, password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    const user = new User({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });

    await user.save(); // Save the user to the database

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};
// ...

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

const userData = async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);

    const useremail = user.email;
    const userData = await User.findOne({ email: useremail });
    res.send({ status: "ok", data: userData });
  } catch (error) {
    res.send({ status: "error", data: "Invalid Token" });
  }
};

module.exports = {
  register,
  login,
  userData,
};
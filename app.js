const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

require("./models/userDetails");
require("./models/storyDetails");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoUrl = "mongodb+srv://netanelham:1q2w3e@user-info.hhi99os.mongodb.net/";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
}).then(() => {
  console.log("Connected to database");
}).catch((e) => console.log(e));

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Define the destination folder for uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Define how uploaded files are named
    }
  });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage: storage }); // Pass the storage configuration to Multer
  
// Require and use routes
const userRoutes = require("./routes/userRoutes");
const storyRoutes = require("./routes/storyRoutes");

app.use("/user", userRoutes);
app.use("/story", storyRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

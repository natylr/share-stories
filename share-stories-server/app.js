const { mongoUrl } = require("./secret");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

const corsOptions = {
  origin: 'https://share-stories.online', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); 

require('dotenv').config();

require("./models/userDetails");
require("./models/storyDetails");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

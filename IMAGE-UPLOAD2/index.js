const express = require("express");
const path = require("path");
const app = express();
const PORT = 6009;
const multer = require("multer");
const mongoose = require("mongoose");
const { type } = require("os");
const { profile } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/imgae-upload")
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log(`${err} mongodb connection error.`));

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  newI: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("image", imageSchema);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.render("signup");
});

app.post(
  "/upload",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
    { name: "newI", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name } = req.body;
      const profilePath = req.files.profile ? req.files.profile[0].path : "";
      const avatarPath = req.files.avatar ? req.files.avatar[0].path : "";
      const newIPath = req.files.newI ? req.files.newI[0].path : "";
      const image = await Image.create({
        name,
        profile: profilePath,
        avatar: avatarPath,
        newI: newIPath,
      });
      console.log("✅ Image saved:", image);
      return res.redirect("/");
    } catch (error) {
      console.error("❌ Error saving image:", error);
      return res.status(500).send("Error uploading files.");
    }
  }
);

app.listen(PORT, () => console.log("Server is listening at port", PORT));

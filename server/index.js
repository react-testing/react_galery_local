require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const fs = require("fs");
const { PORT } = require("./config/config");
const {
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
} = require("./controllers/images");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(__dirname + "/uploads"));

// routes
app.get("/", (req, res) => {
  res.json({
    data: "Index route empty",
  });
});

app.post("/post", async (req, res) => {
  const files = req.body["files[]"];
  const saved = await saveFilesDatabase(files);
  res.json(saved);
});

app.get("/posts", async (req, res) => {
  const images = await getImagesDatabase();
  res.json(images);
});

app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  const filename = req.body.filename;
  const data = await deleteImageDatabase(id);
  fs.unlink(`./uploads/${filename}`, () => {
    res.json({ filename, id });
  });
});

app.put("/post/:id", async (req, res) => {
  const id = req.params.id;
  const { filename, title } = req.body;
  const data = await editTitleImage(id, title);
  res.json({ filename, id, title });
});

app.listen(PORT, () => {
  console.log(`The server started on PORT: ${PORT}`);
});

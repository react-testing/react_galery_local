const ImageModel = require("../models/Image");
const { saveImageModel } = require("../helpers/models");
const { toArrayFormatFile } = require("../helpers/file");

async function saveFilesDatabase(files) {
  const imagesSaved = [];
  const save = async (url, title, date) => {
    const saved = await saveImageModel({ url, title, date });
    imagesSaved.push(saved);
  };

  if (Array.isArray(files)) {
    for (const url of files) {
      await save(url, "Unknow title", new Date().toLocaleString());
    }
  } else {
    await save(files, "Unknow title", new Date().toLocaleString());
  }
  return toArrayFormatFile(imagesSaved);
}

async function getImagesDatabase() {
  const images = await ImageModel.find({});
  return toArrayFormatFile(images);
}

async function deleteImageDatabase(id) {
  const data = await ImageModel.deleteOne({ _id: id });
  return data;
}

async function editTitleImage(id, title) {
  const data = await ImageModel.updateOne({ _id: id }, { title });
  return data;
}

async function getPostById(id) {
  const data = await ImageModel.findById(id);
  return data.toObject();
}

async function likePost(id) {
  const updated = await ImageModel.findByIdAndUpdate(
    { _id: id },
    { $inc: { likes: 1 } }
  );
  return { id, likes: updated.likes + 1 };
}

async function dislikePost(id) {
  const updated = await ImageModel.findByIdAndUpdate(
    { _id: id },
    { $inc: { dislikes: 1 } }
  );
  return { id, dislikes: updated.dislikes + 1 };
}

async function removeOneComment(id) {
  const updated = await ImageModel.findByIdAndUpdate(
    { _id: id },
    { $inc: { comments: -1 } }
  );
  return { id, comments: updated.comments - 1 };
}

module.exports = {
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
  getPostById,
  likePost,
  dislikePost,
  removeOneComment,
};

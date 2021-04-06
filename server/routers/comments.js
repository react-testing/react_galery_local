const express = require("express");
const router = express.Router();
const { success, sendError } = require("../helpers/responses");
const {
  getComments,
  deleteComment,
  deleteAllCommentsInPost,
  editComment,
  createComment,
} = require("../controllers/comments");

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const saved = await createComment(payload);
    res.status(201);
    res.json(success(saved, 201));
  } catch (err) {
    console.log(err);
    sendError(res, "An error ocurred while creating the comment");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await getComments(id);
    res.json(success(comments));
  } catch (err) {
    console.log(err);
    sendError(res, "An error ocurred while querying the comments");
  }
});

// delete only comment
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteComment(id);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while deleting the comment`);
  }
});

// delete all comments in only post
router.delete("/all/:id", async (req, res) => {
  try {
    const id_post = req.params.id_post;
    const data = await deleteAllCommentsInPost(id_post);
    res.json(success(data));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while deleting the all comments`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const data = await editComment(id, payload);
    res.json(success({ id, ...data }));
  } catch (err) {
    console.log(err);
    sendError(res, `An error ocurred while editing the comment`);
  }
});

module.exports = router;
import {
  CREATE_POSTS,
  GET_POSTS,
  DELETE_POST,
  EDIT_POST,
} from "../config/config";
import { toArrayUrlFiles } from "./file";

export const xhr = async (url, body = null, method = "GET") => {
  const xhr = await fetch(url, {
    method,
    body,
  });
  const res = await xhr.json();
  return res;
};

export const getImages = async () => {
  const data = await xhr(GET_POSTS);
  return data;
};

export const createImages = async (files) => {
  const data = new FormData();
  const urlFiles = await toArrayUrlFiles(files);
  for (const fileUrl of urlFiles) data.append("files[]", fileUrl);
  const res = await xhr(CREATE_POSTS, data, "POST");
  return res;
};

export const deleteImage = async (id, filename) => {
  const data = new FormData();
  data.append("filename", filename);
  const res = await xhr(DELETE_POST(id), data, "DELETE");
  return res;
};

export const editTitleImage = async ({ id, filename, title }) => {
  const data = new FormData();
  data.append("filename", filename);
  data.append("title", title);
  const res = await xhr(EDIT_POST(id), data, "PUT");
  return res;
};

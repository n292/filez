import express from "express";
import { createFile } from "#db/queries/files";
import { getFolders, getFolderIncludingFiles } from "#db/queries/folders";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id) || Number(id) > 2147483647) {
    return res.status(404).send("Folder not found.");
  }
  const folder = await getFolderIncludingFiles(Number(id));
  if (!folder) return res.status(404).send("Folder not found.");
  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name, size } = req.body;
  if (!name || size === undefined || size === null) {
    return res.status(400).send("Request body requires: name, size");
  }

  const file = await createFile({ name, size, folder_id: req.folder.id });
  res.status(201).send(file);
});
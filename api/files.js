import express from "express";
import { getFilesIncludingFolderName } from "#db/queries/files";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const files = await getFilesIncludingFolderName();
  res.send(files);
});
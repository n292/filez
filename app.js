import express from "express";
import filesRouter from "#api/files";
import foldersRouter from "#api/folders";

const app = express();
export default app;

app.use(express.json());

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    
    case "22P02":
    
    case "23505":
      return res.status(400).send(err.detail ?? err.message);
    default:
      console.error(err);
      res.status(500).send("Sorry! Something went wrong.");
  }
});
import express from "express";
import multer from "multer";
import { fromPath } from "./src/utils/image-utils";

const app = express();

const upload = multer({ dest: "uploads/" });
app.get('/',function(req,res){
  res.send("hello")
})

app.use("/uploads",express.static("uploads"));
app.post("/upload", upload.single("upload"), async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).json({ error: "No file uploaded" });
  const { path: filePath } = file;
  await fromPath(filePath);

  return res.status(201).json({ ...req.file });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

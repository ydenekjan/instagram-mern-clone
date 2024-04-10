import express, { request } from "express";
import { Image } from "../models/imageModel.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    await newImage.save();
    res.status(201).send("Image uploaded successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const images = await Image.find({});
    const convertedImages = images.map((img) => {
      return {
        contentType: img.contentType,
        data: img.data.toString("base64"),
      };
    });
    res.json(convertedImages);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const img = await Image.findById(id);
    const convertedImg = {
      contentType: img.contentType,
      data: img.data.toString("base64"),
    };
    res.status(201).json(convertedImg);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;

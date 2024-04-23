import express from "express";
import { Post } from "../models/postModel.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//RETURN A SPECIFIC POST
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const img = {
      contentType: post.image.contentType,
      data: post.image.data.toString("base64"),
    };

    const convertedPost = {
      title: post.title,
      author: post.author,
      image: img,
      description: post.description,
      likes: post.likes,
      comments: post.comments,
    };

    return res.status(200).json(convertedPost);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//RETURN ALL POSTS OF A SINGLE USER
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await Post.find({ author: username });

    if (!posts) {
      return res.status(404).send({ message: "No posts found for this user" });
    }

    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//CREATE A POST
router.post("/create", upload.single("image"), async (request, response) => {
  try {
    const newPost = {
      title: request.body.title,
      author: request.body.author,
      image: {
        data: request.file.buffer,
        contentType: request.file.mimetype,
      },
      description: request.body.description,
      likes: [],
      comments: [],
    };

    const post = await Post.create(newPost);

    return response.status(201).send(post);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

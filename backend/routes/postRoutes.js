import express from "express";
import { Post } from "../models/postModel.js";
import multer from "multer";
import { User } from "../models/userModel.js";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//RETURN ALL POSTS OF FOLLOWED ACCOUNTS / ALL POSTS IF NOT LOGGED IN
router.get("/followed/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const currentUser = await User.findOne({ username: username });

    const posts = await Post.find();
    let filteredPosts = [];

    if (currentUser) {
      currentUser.following.map((user) => {
        filteredPosts = posts.filter((post) => post.author === user);
      });

      if (filteredPosts.length === 0) filteredPosts.push(...posts);
    } else {
      filteredPosts.push(...posts);
    }

    const convertedPosts = filteredPosts.map((post) => {
      let img = post.image;

      //?????????????
      //don't touch this EVER, you will never ever figure it out again
      let newPost = { ...post._doc };

      img = {
        ...img,
        contentType: post.image.contentType,
        data: post.image.data.toString("base64"),
      };

      newPost = {
        ...newPost,
        image: img,
      };

      return newPost;
    });

    if (!convertedPosts) {
      return res.status(404).send({ message: "No posts found" });
    }

    return res.status(200).json(convertedPosts);
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

    let user = await User.findOne({ username: request.body.author });
    user.posts.push(post._id);
    await User.findOneAndUpdate({ username: user.username }, user);

    return response.status(201).send("Post created successfully");
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

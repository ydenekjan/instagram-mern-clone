import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

//CREATE ACCOUNT
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.username ||
      !request.body.fullName ||
      !request.body.password
    ) {
      return response.status(400).send({ message: "Send all required data" });
    }

    const newUser = {
      username: request.body.username,
      fullName: request.body.fullName,
      password: request.body.password,
      posts: request.body.posts,
      followers: request.body.followers,
      following: request.body.following,
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//RETURN ACCOUNT
router.get("/:username", async (request, response) => {
  try {
    const { username } = request.params;

    const user = await User.findOne({ username: username });

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

//EDIT ACCOUNT
// router.put('/:username', async (request, response) => {
//     try {
//
//         if (
//             !request.body.username ||
//             !request.body.fullName
//         ) {
//             return response.status(400).send({message: 'Send all required data'})
//         }
//
//         const { username } = request.params
//
//         const result = await User.findOneAndUpdate({ 'username' : username }, request.body)
//
//         if (!result) {
//             return response.status((404)).send({message: "User not found"})
//         }
//
//         return response.status(200).send({message: 'User edited successfully'})
//
//     } catch (error) {
//         console.log(error)
//         return response.status(500).send({message: error.message})
//     }
// })

//DELETE ACCOUNT
router.delete("/:username", async (request, response) => {
  try {
    const { username } = request.params;

    const result = await User.findOneAndDelete({ username: username });

    if (!result) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

//FOLLOW ACCOUNT
router.put("/follow/:username", async (request, response) => {
  try {
    const account = request.params.username;
    const currentUser = request.body._currentUser.username;

    const result = await Promise.all([
      User.findOneAndUpdate({ username: account }, request.body._userData),
      User.findOneAndUpdate(
        { username: currentUser },
        request.body._currentUser,
      ),
    ]);

    if (!result) {
      return response.status(404).json({ message: "Users not found" });
    }

    return response.status(200).send({
      message: `User followed successfully`,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

export default router;

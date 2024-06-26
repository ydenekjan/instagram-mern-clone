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
      !request.body.emailAddress ||
      !request.body.username ||
      !request.body.fullName ||
      !request.body.password
    ) {
      return response.status(400).send({ message: "Send all required data" });
    }

    const newUser = {
      emailAddress: request.body.emailAddress,
      username: request.body.username,
      fullName: request.body.fullName,
      password: request.body.password,
      profilePicture: "",
      posts: [],
      followers: [],
      following: [],
      bio: "",
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

// EDIT ACCOUNT
router.put("/:username/edit", async (request, response) => {
  try {
    if (!request.body.username || !request.body.fullName) {
      return response.status(400).send({ message: "Send all required data" });
    }

    const { username } = request.params;

    let userData = await User.findOne({ username: username });

    userData.username = request.body.username;
    userData.fullName = request.body.fullName;
    userData.bio = request.body.bio;
    userData.profilePicture = request.body.profilePicture || "";

    for (const followedUser of userData.following) {
      let userObj = {};
      userObj = await User.findOne({ username: followedUser });
      const userFollowedIdx = userObj.followers.indexOf(username);
      userObj.followers.splice(userFollowedIdx, 1, userData.username);
      await User.findOneAndUpdate({ username: followedUser }, userObj);
    }

    for (const followingUser of userData.followers) {
      let userObj = {};
      userObj = await User.findOne({ username: followingUser });
      const userFollowingIdx = userObj.followers.indexOf(username);
      userObj.following.splice(userFollowingIdx, 1, userData.username);
      await User.findOneAndUpdate({ username: followingUser }, userObj);
    }

    const result = await User.findOneAndUpdate(
      { username: username },
      userData,
    );

    if (!result) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json(userData);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

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

import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.get("/profile-pictures", async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "pictures",
          localField: "profilePictureId",
          foreignField: "_id",
          as: "profilePicture",
        },
      },
      {
        $unwind: "$profilePicture",
      },
      {
        $project: {
          _id: 1,
          username: 1,
          profilePicture: "$profilePicture.url",
        },
      },
    ];

    const result = await mongoose.model("User").aggregate(pipeline).exec();
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

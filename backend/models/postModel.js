import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    image: {
      contentType: String,
      data: Buffer,
    },
    description: {
      type: String,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = mongoose.model("Post", postSchema);

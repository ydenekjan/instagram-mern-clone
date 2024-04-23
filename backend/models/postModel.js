import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
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
    timestamps: false,
  },
);

export const Post = mongoose.model("Post", postSchema);

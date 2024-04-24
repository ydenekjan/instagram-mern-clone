import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    emailAddress: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    posts: {
      type: Array,
      required: false,
    },
    followers: {
      type: Array,
      required: false,
    },
    following: {
      type: Array,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  },
);

export const User = mongoose.model("User", userSchema);

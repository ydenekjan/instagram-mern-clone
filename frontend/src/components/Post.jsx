import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoAddCircle, IoAddCircleOutline } from "react-icons/io5";

export const Post = (props) => {
  const [postData, setPostData] = useState({});
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPostData(props.props);
  }, []);

  return (
    <div className="border-t py-2">
      <div className="flex p-2 gap-2 items-center">
        <div className="h-8 aspect-square rounded-full bg-black"></div>
        <strong>@{postData.author}</strong>
      </div>

      {postData.image ? (
        <img
          src={`data:${postData.image.contentType};base64,${postData.image.data}`}
          alt="post image"
          className="w-full"
        />
      ) : (
        <div>NO IMAGE</div>
      )}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex gap-6 w-full h-auto relative">
          <button
            onClick={() => {
              setLiked(!liked);
            }}
            type="button"
          >
            {liked ? (
              <FaHeart color={"red"} size={28} />
            ) : (
              <FaRegHeart size={28} />
            )}
          </button>

          <FaRegComment size={28} />
          <FaRegPaperPlane size={28} />
          <button
            className="absolute right-0"
            onClick={() => {
              setSaved(!saved);
            }}
            type="button"
          >
            {saved ? (
              <FaBookmark color={"black"} size={28} />
            ) : (
              <FaRegBookmark size={28} />
            )}
          </button>
        </div>

        <div className="flex gap-2">
          <strong>{postData.author}</strong>
          {postData.description}
        </div>
      </div>
    </div>
  );
};

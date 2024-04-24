import React, { useEffect, useState } from "react";
import {
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";

export const Post = (props) => {
  const [postData, setPostData] = useState({});

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
          <FaRegHeart size={28} />
          <FaRegComment size={28} />
          <FaRegPaperPlane size={28} />
          <FaRegBookmark className="absolute right-0" size={28} />
        </div>

        <div className="flex gap-2">
          <strong>{postData.author}</strong>
          {postData.description}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { fetchPosts } from "../hooks/fetchPosts.js";

export const Post = (props) => {
  const [postData, setPostData] = useState(props);

  return (
    <div key={postData._id}>
      <h1>{postData.title || "TITLE"}</h1>
      <h2>{postData.author || "AUTHOR"}</h2>
      <h2>{postData.createdAt || "TIME"}</h2>
      {postData.image ? (
        <img
          src={`data:${postData.image.contentType};base64,${postData.image.data}`}
          alt="post image"
        />
      ) : (
        <div>NO IMAGE</div>
      )}

      <div>{postData.description}</div>
      <div>
        {postData.comments?.length || 0} | {postData.likes?.length || 0}
      </div>
      <div>{postData.comments || ""}</div>
    </div>
  );
};

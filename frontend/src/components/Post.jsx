import React, { useEffect, useState } from "react";
import { fetchPost } from "../hooks/fetchPost.js";

export const Post = (props) => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    fetchPost(props.postId).then((res) => {
      setPostData(res.data);
    });
  }, []);

  return (
    <>
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

      <div>{postData.description?.length || 0}</div>
      <div>
        {postData.comments?.length || 0} | {postData.likes?.length || 0}
      </div>
      <div>{postData.comments || ""}</div>
    </>
  );
};

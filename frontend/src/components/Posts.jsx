import React, { useEffect, useState } from "react";
import { fetchPosts } from "../hooks/fetchPosts.js";
import { useMapPosts } from "../hooks/useMapPosts.jsx";

const Posts = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchPosts().then((res) => {
      console.log(res);
      setPostsData(useMapPosts(res.data));
    });
  }, []);

  return (
    <div className="flex flex-col-reverse overflow-y-scroll pb-12">
      {postsData}
    </div>
  );
};

export default Posts;

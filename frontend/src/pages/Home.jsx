import React, { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import { Post } from "../components/Post.jsx";
import { fetchPosts } from "../hooks/fetchPosts.js";

const Home = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchPosts().then((res) => {
      setPostsData(res.data);
    });
  }, []);

  return (
    <div className="">
      Home
      <MobileNav></MobileNav>
      {postsData.map((post) => {
        return <Post key={post._id} />;
      })}
    </div>
  );
};

export default Home;

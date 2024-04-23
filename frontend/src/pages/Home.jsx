import React from "react";
import MobileNav from "../components/MobileNav.jsx";
import { Post } from "../components/Post.jsx";

const Home = () => {
  return (
    <div>
      Home
      <MobileNav></MobileNav>
      <Post postId={"66280eb772e949bb06e1cb0b"} />
    </div>
  );
};

export default Home;

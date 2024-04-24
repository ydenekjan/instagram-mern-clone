import React, { useEffect } from "react";
import MobileNav from "../components/MobileNav.jsx";
import Posts from "../components/Posts.jsx";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mt-2 px-2">For you</h1>
      <div className="flex py-4 gap-3 overflow-x-auto no-scrollbar">
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
        <div className="h-24 aspect-square rounded-full bg-neutral-400" />
      </div>

      <Posts />
      <MobileNav />
    </>
  );
};

export default Home;

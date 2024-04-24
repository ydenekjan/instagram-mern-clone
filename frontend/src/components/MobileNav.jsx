import React from "react";
import { GoHome, GoHomeFill, GoPerson, GoPersonFill } from "react-icons/go";
import {
  IoPlayCircleOutline,
  IoPlayCircleSharp,
  IoSearchOutline,
  IoSearchSharp,
  IoAddCircle,
  IoAddCircleOutline,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let accountLink = currentUser?.username || "login";

  const location = useLocation();
  const url = location.pathname;

  return (
    <div className="max-w-md left-0 right-0 h-12 fixed bottom-0 bg-white z-10 border-t px-4 flex items-center mx-auto">
      <ul className="w-full flex flex-row justify-between">
        <Link id="home" to="/">
          {url === "/" || "" ? <GoHomeFill size={28} /> : <GoHome size={28} />}
        </Link>
        <Link id="search" to="/search">
          {url.includes("/search") ? (
            <IoSearchSharp size={28} />
          ) : (
            <IoSearchOutline size={28} />
          )}
        </Link>
        <Link id="create" to="/create">
          {url.includes("/create") ? (
            <IoAddCircle size={28} />
          ) : (
            <IoAddCircleOutline size={28} />
          )}
        </Link>
        <Link id="reels" to="/reels">
          {url.includes("/reels") ? (
            <IoPlayCircleSharp size={28} />
          ) : (
            <IoPlayCircleOutline size={28} />
          )}
        </Link>
        <Link id="account" to={"/" + accountLink}>
          {url === "/" + accountLink ? (
            <GoPersonFill size={28} />
          ) : (
            <GoPerson size={28} />
          )}
        </Link>
      </ul>
    </div>
  );
};

export default MobileNav;

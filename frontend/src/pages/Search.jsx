import React, { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [userList, setUserList] = useState();

  const userMap = (user) => (
    <Link
      to={"/" + user.username}
      key={user.username}
      className="h-14 flex gap-4"
    >
      <div className="rounded-full bg-black h-14 w-14 overflow-hidden"></div>
      <div className="flex flex-col justify-evenly leading-1">
        {" "}
        <strong>@{user.username}</strong>
        <div className="font-light">{user.fullName}</div>
      </div>
    </Link>
  );

  useEffect(() => {
    axios.get(`http://localhost:5555/users`).then((res) => {
      setUserList(res.data.data.map(userMap));
    });
  }, []);

  const handleInput = async (e) => {
    axios.get(`http://localhost:5555/users`).then((res) => {
      setUserList(
        res.data.data
          .filter(
            (user) =>
              user.username.includes(e.target.value) ||
              user.fullName.includes(e.target.value),
          )
          .map(userMap),
      );
    });
  };

  return (
    <div className="p-6">
      <div className="text-lg mb-6 flex gap-6">
        <input
          type="search"
          onInput={handleInput}
          placeholder="Search"
          className="bg-neutral-200 rounded-md w-full p-1"
        />
        <button>Cancel</button>
      </div>

      <div className="text-lg flex flex-col gap-6 relative">{userList}</div>
      <MobileNav></MobileNav>
    </div>
  );
};

export default Search;

import React, { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [userList, setUserList] = useState([]);
  const [originalUserList, setOriginalUserList] = useState([]);

  const userMap = (user) => (
    <Link
      to={"/" + user.username}
      key={user.username}
      className="h-14 flex gap-4"
    >
      <div className="rounded-full bg-black h-14 w-14 overflow-hidden"></div>
      <div className="flex flex-col justify-evenly leading-1">
        <strong>@{user.username}</strong>
        <div className="font-light">{user.fullName}</div>
      </div>
    </Link>
  );

  useEffect(() => {
    axios.get(`https://ig-clone-backend.onrender.com/users`).then((res) => {
      setOriginalUserList(res.data.data);
    });
  }, []);

  useEffect(() => {
    setUserList(originalUserList);
  }, [originalUserList]);

  const searchbar = document.getElementById("searchbar");

  const handleInput = async () => {
    setUserList(
      originalUserList.filter(
        (user) =>
          user.username.includes(searchbar.value) ||
          user.fullName.includes(searchbar.value),
      ),
    );
  };

  const handleCancel = () => {
    searchbar.value = "";
    searchbar.focus();
    handleInput();
  };

  return (
    <>
      <section className="flex flex-col mt-2 mx-2">
        <div className="text-lg pb-3 mb-3 flex gap-6 border-b">
          <input
            type="input"
            id="searchbar"
            onInput={handleInput}
            placeholder="Search"
            className="bg-neutral-200 rounded-md w-full p-1 indent-1"
          />
          <button onClick={handleCancel}>Cancel</button>
        </div>

        <div className=" mx-2 text-lg flex flex-col gap-6 relative overflow-y-scroll">
          {userList.map(userMap)}
        </div>
      </section>
      <MobileNav></MobileNav>
    </>
  );
};

export default Search;

import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import MobileNav from "./MobileNav.jsx";

const MyAccount = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")) || {});
  }, []);

  return (
    <div className="p-4">
      <div className="font-light">
        {/*HEADER*/}
        <div className="w-full h-auto flex justify-between align-middle">
          <div className="text-lg font-semibold">
            {currentUser?.username || ""}
          </div>
          <IoIosMenu size={28} />
        </div>
        <div className="flex py-4">
          <div className="w-28 h-28 bg-black rounded-full overflow-hidden grow-0">
            {/*  TODO: PFP  */}
          </div>
          <div className="grow inline-flex justify-evenly">
            <div className="my-auto flex flex-col text-center text-lg leading-4 font-semibold">
              {currentUser.posts?.length || 0}
              <a className="text-sm font-light leading-4">Posts</a>
            </div>
            <div className="my-auto flex flex-col text-center text-lg leading-4 font-semibold">
              {currentUser.followers?.length || 0}
              <a className="text-sm font-light leading-4">Followers</a>
            </div>
            <div className="my-auto flex flex-col text-center text-lg leading-4 font-semibold">
              {currentUser.following?.length || 0}
              <a className="text-sm font-light leading-4">Following</a>
            </div>
          </div>
        </div>
        <div className="font-semibold">{currentUser?.fullName || ""}</div>
        <div className="max-h-36 overflow-clip w-80 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda,
          at dicta dignissimos distinctio laboriosam molestiae natus perferendis
          quia quod recusandae?
        </div>
        <div className="py-4 w-full flex justify-between gap-2 font-normal">
          <button className="w-full h-8 rounded-lg bg-neutral-300">
            Edit Profile
          </button>
          <button className="w-full h-8 rounded-lg bg-neutral-300">
            Share Profile
          </button>
        </div>
      </div>
      <MobileNav></MobileNav>
    </div>
  );
};

export default MyAccount;

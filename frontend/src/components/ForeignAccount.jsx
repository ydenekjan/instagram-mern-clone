import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav.jsx";
import { IoIosArrowBack, IoIosMenu } from "react-icons/io";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ForeignAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const { username } = useParams();

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")) || {});
  }, [refresh]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/users/${username}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setUserData(null);
        setLoading(false);
      });
  }, [url, refresh]);

  function axiosFollowCall(data) {
    axios
      .put(`http://localhost:5555/users/follow/${username}`, data)
      .then(() => {
        setRefresh(refresh + 1);
        localStorage.setItem("currentUser", JSON.stringify(data._currentUser));
      });
  }

  function followAccount() {
    if (!currentUser) {
      alert("Please log in first!");
      window.location.pathname = "/login";
      return;
    }

    let _currentUser = currentUser;
    let _userData = userData;

    console.log(_currentUser);

    _currentUser.following.push(_userData.username);
    _userData.followers.push(_currentUser.username);

    const data = { _currentUser, _userData };

    axiosFollowCall(data);
  }

  function unfollowAccount() {
    let _currentUser = currentUser;
    let _userData = userData;

    _currentUser.following.splice(
      _currentUser.following.indexOf(_userData.username),
      1,
    );
    _userData.followers.splice(
      _userData.followers.indexOf(_currentUser.username),
      1,
    );

    const data = { _currentUser, _userData };

    axiosFollowCall(data);
  }

  return (
    //TODO: loading icon
    !userData ? (
      <div>User not found</div>
    ) : (
      <div className="p-4">
        <div className="font-light">
          <div className="w-full h-auto flex justify-between align-middle">
            <IoIosArrowBack size={26} onClick={() => navigate(-1)} />
            <div className="text-lg font-semibold">
              {userData?.username || ""}
            </div>
            <IoIosMenu size={28} />
          </div>
          <div className="flex py-4">
            <div className="w-28 h-28 bg-blue-900 rounded-full overflow-hidden grow-0">
              {/*  TODO: PFP  */}
            </div>
            <div className="grow inline-flex justify-evenly">
              <div className="my-auto flex flex-col text-center text-lg font-semibold">
                {userData.posts?.length || 0}
                <a className="text-sm font-light leading-4">Posts</a>
              </div>
              <div className="my-auto flex flex-col text-center text-lg font-semibold">
                {userData.followers?.length || 0}
                <a className="text-sm font-light leading-4">Followers</a>
              </div>
              <div className="my-auto flex flex-col text-center text-lg font-semibold">
                {userData.following?.length || 0}
                <a className="text-sm font-light leading-4">Following</a>
              </div>
            </div>
          </div>
          <div className="font-semibold">{userData?.fullName || ""}</div>
          <div className="max-h-36 overflow-clip w-80 ">{userData.bio}</div>
          <div className="py-4 w-full flex justify-between gap-2 font-normal">
            {userData.following &&
            userData.followers.includes(currentUser.username) ? (
              <button
                onClick={unfollowAccount}
                className="w-full h-8 rounded-lg bg-neutral-300"
              >
                Following
              </button>
            ) : (
              <button
                onClick={followAccount}
                className="w-full h-8 rounded-lg bg-blue-600 text-white"
              >
                Follow
              </button>
            )}

            <button
              onClick={localStorage.clear}
              className="w-full h-8 rounded-lg bg-neutral-300"
            >
              Message
            </button>
          </div>
        </div>

        <MobileNav></MobileNav>
      </div>
    )
  );
};

export default ForeignAccount;

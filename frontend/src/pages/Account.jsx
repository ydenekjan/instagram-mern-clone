import React, { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import MyAccount from "../components/MyAccount.jsx";
import ForeignAccount from "../components/ForeignAccount.jsx";

const Account = () => {
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const { username } = useParams();

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")) || {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://ig-clone-backend.onrender.com/users/${username}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {
        setUserData(null);
      });
  }, [url]);

  return (
    <div className="h-full overflow-y-clip">
      {currentUser?.username !== userData?.username ? (
        <ForeignAccount />
      ) : (
        <MyAccount />
      )}
      <MobileNav />
    </div>
  );
};

export default Account;

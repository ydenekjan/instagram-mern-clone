import React, { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    if (currentUser) navigate("/" + currentUser.username);
  }, [currentUser]);

  const handleSubmit = function (event) {
    axios
      .get(`http://localhost:5555/users/${event.target.username.value}`)
      .then((response) => {
        if (event.target.password.value === response.data.password) {
          setCurrentUser(response.data);
        }
      });

    event.preventDefault();
  };

  return (
    <div className="flex content-center flex-col flex-wrap">
      <div className="mt-20 mb-14 mx-auto text-4xl font-serif">Clonegram</div>
      <form className="w-80" onSubmit={handleSubmit}>
        <label>
          <input
            id="username"
            className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
            placeholder="Username"
          />
        </label>
        <label>
          <input
            id="password"
            className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
            placeholder="Password"
          />
        </label>
        <button className="bg-blue-400 p-1.5 text-sm border rounded-lg w-full my-1 text-md font-bold text-white border-blue-400">
          Log in
        </button>
      </form>

      <MobileNav></MobileNav>
    </div>
  );
};

export default Login;

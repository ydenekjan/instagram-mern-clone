import React, { useRef, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";

const Register = () => {
  const [passwordState, setPasswordState] = useState("password");
  const passwordInput = useRef(null);

  function handleRegister(event) {
    event.preventDefault();

    const data = {
      emailAddress: event.target.emailAddress.value,
      username: event.target.username.value,
      fullName: event.target.fullName.value,
      password: event.target.password.value,
      posts: [],
      following: [],
      followers: [],
      bio: "",
    };

    axios.get("http://localhost:5555/users").then((response) => {
      let accountExists = false;

      response.data.data.forEach((user) => {
        if (
          user.username === data.username ||
          user.emailAddress === data.emailAddress
        ) {
          return (accountExists = true);
        }
      });

      if (!accountExists) {
        axios
          .post("http://localhost:5555/users", data)
          .then(() => {
            localStorage.setItem("currentUser", JSON.stringify(data));
            window.location.pathname = "/" + data.username;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("user with this username or email address already exists!");
      }
    });
  }

  const inputRegex = {
    emailRegex: /^[a-zA-Z0-9@.]*$/,
    usernamePasswordRegex: /^[a-zA-Z0-9_.-]*$/,
  };

  const inputCheck = (e, rgx) => {
    if (
      e.key === "Backspace" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      return true;
    }
    if (rgx.test(e.key)) {
      return true;
    }
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex content-center flex-col flex-wrap">
        <div className="mt-20 mb-14 mx-auto text-4xl font-serif">Clonegram</div>
        <form id={"registerForm"} className="w-80" onSubmit={handleRegister}>
          <label>
            <input
              onKeyDown={(e) => inputCheck(e, inputRegex.emailRegex)}
              type="email"
              id="emailAddress"
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Email Address"
              required={true}
            />
          </label>
          <label>
            <input
              id="fullName"
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Full Name"
              required={true}
              max={24}
            />
          </label>
          <label>
            <input
              onKeyDown={(e) => inputCheck(e, inputRegex.emailRegex)}
              id="username"
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Username"
              max={12}
              required={true}
            />
          </label>
          <label className="relative">
            <input
              onKeyDown={(e) => inputCheck(e, inputRegex.emailRegex)}
              type={passwordState}
              ref={passwordInput}
              id="password"
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Password"
              max={16}
              required={true}
            ></input>
            <button
              type={"button"}
              onClick={() => {
                passwordState === "password"
                  ? setPasswordState("text")
                  : setPasswordState("password");
                setTimeout(() => passwordInput.current.focus(), 0);
              }}
              className="absolute right-3 top-px text-sm font-bold text-neutral-600"
            >
              SHOW
            </button>
          </label>
          <button className="bg-blue-400 p-1.5 text-sm border rounded-lg w-full my-8 font-bold text-white border-blue-400">
            Register
          </button>
        </form>

        <MobileNav></MobileNav>
      </div>
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditAccount = () => {
  const [currentUser, setCurrentUser] = useState({ bio: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")) || {});
  }, []);

  function handleAccountEdit(event) {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      fullName: event.target.fullName.value,
      bio: event.target.bio.value,
    };

    axios
      .put(`http://localhost:5555/users/${currentUser.username}/edit`, data)
      .then((response) => {
        setCurrentUser(response.data);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate("/" + data.username);
      });
  }

  return (
    <div>
      <div className="p-4 w-full h-auto flex justify-between align-middle relative border-b">
        <IoIosArrowBack
          size={26}
          className="absolute"
          onClick={() => navigate(-1)}
        />
        <div className="text-lg font-semibold w-full flex justify-center">
          Edit Profile
        </div>
      </div>
      <div className="pb-4 flex flex-col w-full flex-wrap content-center border-b">
        <div className="my-4 mx-auto w-28 h-28 bg-blue-900 rounded-full overflow-hidden">
          {/*  TODO: PFP  */}
        </div>
        <button className="text-blue-500">Edit profile picture</button>
      </div>

      <form onSubmit={handleAccountEdit} className="relative border-b">
        <label className="flex m-6">
          Name
          <input
            id={"fullName"}
            className="border-b focus:outline-0 absolute right-6 w-72"
            defaultValue={currentUser.fullName}
          ></input>
        </label>

        <label className="flex w-full m-6">
          Username
          <input
            id={"username"}
            className="border-b focus:outline-0 absolute right-6 w-72"
            defaultValue={currentUser.username}
          ></input>
        </label>

        <label className="flex w-full m-6">
          Bio
          <input
            id={"bio"}
            className="border-b focus:outline-0 absolute right-6 w-72"
            defaultValue={currentUser.bio}
          ></input>
        </label>

        <button className="text-blue-500 absolute left-6 -bottom-10">
          Edit account
        </button>
      </form>
      <div className="m-6"></div>
    </div>
  );
};

export default EditAccount;

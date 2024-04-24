import React, { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const author = JSON.parse(localStorage.getItem("currentUser")).username;
  const navigate = useNavigate();

  useEffect(() => {
    if (!author) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePost = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("image", image);

    try {
      axios
        .post("https://ig-clone-backend.onrender.com/posts/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          navigate(`/`);
        });
    } catch (err) {
      alert("not stonks: ");
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex content-center flex-col flex-wrap">
        <div className="mt-20 mb-14 mx-auto text-4xl font-serif">
          Create a Post
        </div>
        <form id={"createPostForm"} className="w-80" onSubmit={handlePost}>
          <label>
            <input
              id="title"
              onChange={handleTitleChange}
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Title"
              required={true}
            />
          </label>
          <label>
            <input
              id="desc"
              onChange={handleDescriptionChange}
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Description"
              required={true}
            />
          </label>
          <div className="w-full aspect-square rounded-2xl mt-6 mb-3 overflow-hidden">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="post image" />
            ) : (
              <div className="w-full h-full bg-neutral-300"></div>
            )}
          </div>
          <label
            className={
              "bg-neutral-100 p-2 text-sm border rounded-md border-neutral-300 text-neutral-500 flex justify-center"
            }
          >
            Choose Photo
            <input
              id="image"
              type={"file"}
              name="image"
              onChange={handleImageChange}
              required={true}
              className={"hidden"}
            />
          </label>
          <button className="bg-blue-400 p-1.5 text-sm border rounded-lg w-full my-8 font-bold text-white border-blue-400">
            Post
          </button>
        </form>
      </div>
      <MobileNav></MobileNav>
    </div>
  );
};

export default Create;

import React, { useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import axios from "axios";

const Create = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const author = JSON.parse(localStorage.getItem("currentUser")).username;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(author);
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

    console.log(formData);

    try {
      axios
        .post("http://localhost:5555/posts/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("stonks");
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
              placeholder="Title"
              required={true}
            />
          </label>
          <label>
            <input
              id="image"
              type={"file"}
              name="image"
              onChange={handleImageChange}
              className="bg-neutral-100 p-2 text-sm border rounded-md w-full my-1 border-neutral-300 placeholder-neutral-500"
              placeholder="Title"
              required={true}
            />
          </label>
          <button className="bg-blue-400 p-1.5 text-sm border rounded-lg w-full my-8 font-bold text-white border-blue-400">
            Post
          </button>
        </form>

        <MobileNav></MobileNav>
      </div>
      <MobileNav></MobileNav>
    </div>
  );
};

export default Create;

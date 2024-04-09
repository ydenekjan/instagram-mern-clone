import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5555/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("stonks");
    } catch (err) {
      alert("not stonks");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;

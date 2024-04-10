import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload.jsx";

const Images = () => {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState({});

  useEffect(() => {
    fetchImages();
    fetchSelectedImg("66169d7370a7e51240656103");
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5555/images");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images: ", err.message);
    }
  };

  const fetchSelectedImg = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5555/images/${id}`);
      setSelectedImg(res.data);
    } catch (err) {
      console.error("Error fetching images: ", err.message);
    }
  };

  return (
    <div>
      <ImageUpload />
      <div>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={`data:${img.contentType};base64,${img.data}`}
              alt={`Image ${idx}`}
            ></img>
          </div>
        ))}
      </div>
      <div>
        selected image
        <img
          src={`data:${selectedImg.contentType};base64,${selectedImg.data}`}
          alt="kys"
        />
      </div>
    </div>
  );
};

export default Images;

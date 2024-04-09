import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload.jsx";

const Images = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5555/images/images");
      setImages(res.data);
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
    </div>
  );
};

export default Images;

import axios from "axios";

export const fetchPost = async (id) => {
  try {
    return await axios.get(`https://ig-clone-backend.onrender.com/posts/${id}`);
  } catch (err) {
    console.error("Error fetching posts: ", err.message);
  }
};

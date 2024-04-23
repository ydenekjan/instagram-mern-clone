import axios from "axios";

export const fetchPost = async (id) => {
  try {
    return await axios.get(`http://localhost:5555/posts/${id}`);
  } catch (err) {
    console.error("Error fetching posts: ", err.message);
  }
};

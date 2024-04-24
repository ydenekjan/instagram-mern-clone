import axios from "axios";

export const fetchPosts = async () => {
  try {
    return await axios.get(
      `http://localhost:5555/posts`,
      JSON.parse(localStorage.getItem("currentUser")).following,
    );
  } catch (err) {
    console.error("Error fetching posts: ", err.message);
  }
};

import axios from "axios";

export const fetchPosts = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return await axios.get(
      `https://ig-clone-backend.onrender.com/posts/followed/${currentUser.username}`,
    );
  } catch (err) {
    console.error("Error fetching posts: ", err.message);
  }
};

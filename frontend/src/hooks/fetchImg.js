import axios from "axios";

export const fetchImg = async (id) => {
  try {
    const res = await axios.get(
      `https://ig-clone-backend.onrender.com/imgs/${id}`,
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching images: ", err.message);
  }
};

import { Post } from "../components/Post.jsx";

export const useMapPosts = (posts) => {
  console.log(posts);
  return posts.map((post, idx) => {
    return <Post props={post} key={idx} />;
  });
};

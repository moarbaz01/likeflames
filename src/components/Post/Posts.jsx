import { useMemo } from "react";
import PostItem from "./PostIem";
import PostSkeleton from "../Skeleton/PostSkeleton";
import { useSelector } from "react-redux";
function Posts({ posts = [], condition = "single" }) {
  const { isLoading } = useSelector((state) => state.post);
  // Filtered Posts
  const filteredPosts = useMemo(() => {
    if (posts.length === 0) {
      return [];
    }
    if (condition === "single") {
      return posts?.filter((item) => item?.postType === "post");
    } else {
      return posts;
    }
  }, [posts, condition]);

  return (
    <div className="">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((item, index) => <PostSkeleton key={index} />)
        : filteredPosts?.map((post, index) => (
            <PostItem key={index} {...post} />
          ))}
    </div>
  );
}

export default Posts;

import React, { useMemo } from "react";
import PostItem from "./PostIem";
function Posts({ posts = [], condition = "single" }) {
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
      {filteredPosts?.map((post, index) => (
        <PostItem key={index} {...post} />
      ))}
    </div>
  );
}

export default Posts;

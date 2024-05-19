import React from "react";
import { posts } from "../data";
import PostItem from "./PostIem";
function Posts() {
  return (
    <div className="">
      {posts.map((post, index) => (
        <PostItem
          key={index}
          user={post.user}
          file={post.file}
          likes={post.likes}
          comments={post.comments}
          caption={post.caption}
          fileType={post.fileType}
        />
      ))}
    </div>
  );
}

export default Posts;

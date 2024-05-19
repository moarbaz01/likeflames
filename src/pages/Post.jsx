import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { comments, posts } from "../data";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import PostItem from "../components/PostIem";

function Post({ reelData }) {
  const [showReplies, setShowReplies] = useState(false);
  const [heart, setHeart] = useState(false);
  return (
    <div className=" md:pb-0 pb-24 ">
      <div className=" md:static fixed border-b-2 top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>
      <div className="relative mx-auto max-w-[1400px] mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] md:mt-0 mt-20 mx-2 md:mx-0  flex justify-between gap-4 ">
          <div className=" md:h-[90vh] w-full md:w-[70%] rounded-xl overflow-y-scroll ">
            <PostItem
              user={posts[0].user}
              file={posts[0].file}
              likes={posts[0].likes}
              comments={posts[0].comments}
              caption={posts[0].caption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

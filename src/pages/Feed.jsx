import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeedItem from "../components/FeedItem";
import reel3 from "../assets/reel3.mp4";
import reel1 from "../assets/reel1.mp4";
import { BiArrowToLeft, BiLeftArrowAlt } from "react-icons/bi";
import avatar1 from "../assets/avatars/avatar1.png";
import { CiAlignLeft } from "react-icons/ci";

function Feed() {
  const navigate = useNavigate();
  const feedItems = [
    {
      user: {
        name: "John Doe",
        avatar: avatar1,
      },
      videoUrl: reel3,
      text: "Check out my new video!",
    },
    {
      user: {
        name: "John Doe",
        avatar: avatar1,
      },
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      text: "This is a sample video.",
    },
    {
      user: {
        name: "John Doe",
        avatar: avatar1,
      },
      videoUrl: reel1,
      text: "This is another sample video.",
    },
  ];
  return (
    <div className=" md:pb-0 ">
      <div className=" hidden md:block">
        <Navbar />
      </div>

      <div className="relative  mx-auto md:max-w-[1400px] md:px-4 md:mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] flex items-start justify-between gap-4 ">
          <div className=" md:w-[50%] md:mx-auto w-full md:h-[90vh] md:mt-0 mt-4 h-auto  md:rounded-xl">
            {/* Feed */}
            <div className="fixed md:static top-0 left-0 right-0 bottom-0 md:h-full snap-y overflow-y-scroll snap-mandatory">
              <div className="fixed md:hidden z-50 top-4 left-4">
                <BiLeftArrowAlt
                  className=" text-main_dark_violet_color text-5xl cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
              {feedItems.map((item, index) => (
                <FeedItem
                  key={index}
                  user={item.user}
                  text={item.text}
                  videoUrl={item.videoUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;

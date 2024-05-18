import React, { useEffect, useRef, useState } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaHeart, FaShare } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const FeedItem = ({ user, text, videoUrl }) => {
  const [play, setPlay] = useState(true);
  const [heart, setHeart] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const likeHandler = () => {
    setHeart(!heart);
  };

  const videoHandler = () => {
    setPlay(!play);
    const video = videoRef.current;
    if (play) {
      video.play();
    } else {
      video.pause();
    }
  };

  const openCommentsModal = () => {};

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setPlay(true);
          videoRef.current.pause();
        } else {
          setPlay(false);
          videoRef.current.play();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full snap-start bg-white overflow-hidden"
    >
      <div className="relative h-full w-full md:mx-0 mx-auto flex items-center justify-center">
        <video
          onClick={videoHandler}
          loop
          autoPlay
          ref={videoRef}
          className="w-full object-cover object-center h-full"
          src={videoUrl}
        />
        {/* Bottom */}
        <div className="absolute bg-white/40 bottom-0 left-0 right-0 px-2 py-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex">
              <img src={user.avatar} className="size-12 " alt="" />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm ">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center flex-col gap-2">
              <button className="text-sm bg-main_dark_violet_color px-6 py-2 rounded-xl">
                Follow
              </button>
            </div>
          </div>
          <p className="text-sm mt-2">{text}</p>
        </div>

        {/* Right icons */}
        <div className="absolute right-2 top-[50%]">
          <div className="text-white text-center">
            <FaHeart
              onClick={likeHandler}
              fill={heart ? "red" : "white"}
              size={30}
              className="cursor-pointer"
            />
            <span>0</span>
          </div>
          <div
            onClick={openCommentsModal}
            className="text-white mt-4 md:hidden text-center"
          >
            <FaMessage size={30} className="cursor-pointer" />
            <span>0</span>
          </div>
          <div className="text-white mt-4 text-center">
            <FaShare size={30} className="cursor-pointer" />
            <span>0</span>
          </div>
        </div>

        {/* Play And Pause Button */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button onClick={videoHandler}>
            {play && (
              <CiPlay1
                size={40}
                className="cursor-pointer text-white bg-main_dark_violet_color p-2 rounded-full"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;

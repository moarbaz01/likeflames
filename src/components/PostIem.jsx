import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import {
  CiBookmarkPlus,
  CiChat2,
  CiHeart,
  CiPlay1,
  CiShare2,
} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import CommentModal from "./CommentModal";

function PostItem({ user, file, likes, comments, caption }) {
  const [heart, setHeart] = useState(false);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = React.useRef(null);
  const navigate = useNavigate();
  const [showCommentModal, setShowCommentModal] = useState(false);

  const handleOpenCommentModal = () => {
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
  };

  const handlerPlay = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };

  const fileExtension = file.split(".").pop();
  const videoExtension = ["mp4", "mov", "avi", "wmv", "webm"];

  const onLoad = () => {
    setLoading(false);
  };

  return (
    <div className="w-full mb-4 bg-main_bg_white rounded-xl">
      {/* Top */}
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={user.profile}
            alt=""
          />
          <div>
            <h1 className="text-lg font-[400] text-main_text_black">
              {user.name}
            </h1>
            <p className="text-gray-500 text-xs">12 February 2024</p>
          </div>
        </div>
        <HiOutlineDotsHorizontal className="cursor-pointer" />
      </div>
      {/* Media */}
      {videoExtension.includes(fileExtension) ? (
        <div className="relative">
          <video
            className="md:max-h-[720px] max-h-[420px] mx-auto max-w-full rounded-xl p-2 cursor-pointer"
            autoPlay
            onClick={handlerPlay}
            ref={videoRef}
            onLoadedData={onLoad}
          >
            <source src={file} />
          </video>
          {!play && (
            <CiPlay1 className="absolute left-[50%] top-[50%] bg-main_dark_violet_color cursor-pointer text-white h-6 w-6 rounded-full p-1" />
          )}
          {!loading && (
            <p className="absolute top-4 left-4 text-white">
              {videoRef?.current?.duration.toFixed(2)}
            </p>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-gray-300 rounded-xl"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <img
            className="md:max-h-[720px] max-h-[420px] mx-auto max-w-full rounded-xl p-2 cursor-pointer"
            src={file}
            alt=""
            onLoad={onLoad}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-gray-300 rounded-xl"
              />
            </div>
          )}
        </div>
      )}

      {/* Bottom */}
      <div className="px-2 py-2 w-[90] gap-2 flex flex-wrap">
        <span className="text-gray-500">@{user.username}</span>{" "}
        <span className="text-md text-gray-700">{caption}</span>
      </div>
      <div className="flex items-center justify-between px-2">
        {/* Caption */}
        <div className="flex items-center text-3xl gap-4">
          {!heart ? (
            <CiHeart
              onClick={() => setHeart(!heart)}
              className="cursor-pointer"
            />
          ) : (
            <FaHeart
              fill="red"
              onClick={() => setHeart(!heart)}
              className="cursor-pointer text-3xl"
            />
          )}
          <CiChat2 className="cursor-pointer" />
          <CiShare2 className="cursor-pointer" />
        </div>
        <CiBookmarkPlus className="cursor-pointer text-3xl" />
      </div>
      <div className="px-4 py-2 flex flex-col">
        <p className="text-gray-500 text-sm">{likes} Likes</p>
        <p
          onClick={() => navigate("/post")}
          className="text-gray-500 cursor-pointer hover:text-gray-600 transition text-sm"
        >
          View all {comments} comments
        </p>
        <p
          onClick={handleOpenCommentModal}
          className=" text-main_dark_violet_color mt-2 cursor-pointer font-[500] text-sm"
        >
          Write comment
        </p>
      </div>

      <CommentModal
        isOpen={showCommentModal}
        onClose={handleCloseCommentModal}
      />
    </div>
  );
}

export default PostItem;

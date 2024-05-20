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
import {
  BiLeftArrowAlt,
  BiPencil,
  BiRightArrowAlt,
  BiShare,
} from "react-icons/bi";
import { PiTrash } from "react-icons/pi";

function PostItem({ user, file, likes, comments, caption, fileType }) {
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();
  const [showPostOptionModal, setShowPostOptionModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [fileIndex, setFileIndex] = useState(0);
  const handleOpenCommentModal = () => {
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
  };

  return (
    <div className="w-full mb-4 relative dark:drop-shadow-xl bg-main_bg_white dark:bg-dark_secondary_bg rounded-xl">
      {/* Top */}
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex cursor-pointer items-center gap-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={user.profile}
            alt=""
          />
          <div>
            <h1 className="text-lg font-[400] dark:text-white text-main_text_black">
              {user.name}
            </h1>
            <p className="text-gray-500 text-xs">12 February 2024</p>
          </div>
        </div>
        <HiOutlineDotsHorizontal
          onClick={() => setShowPostOptionModal((prev) => !prev)}
          className="cursor-pointer dark:text-white"
        />
      </div>
      {/* Media */}
      {fileType === "video" ? (
        <div className="relative">
          <video
            className="md:max-h-[720px] max-h-[420px] mx-auto max-w-full rounded-xl p-2 cursor-pointer"
            autoPlay
            controls
            controlsList="nodownload"
          >
            <source src={file} />
          </video>
        </div>
      ) : (
        <div className="relative   ">
          <img
            className=" rounded-xl md:block mx-auto h-conttain md:max-h-[500px] w-contain p-2 cursor-pointer"
            src={Array.isArray(file) ? file[fileIndex] : file}
            alt=""
          />

          {Array.isArray(file) && file.length > 1 && (
            <BiLeftArrowAlt
              onClick={() =>
                setFileIndex((prev) => (prev - 1 + file.length) % file.length)
              }
              className=" md:text-main_dark_violet_color text-white text-3xl cursor-pointer top-[50%] left-4 absolute z-[50]"
            />
          )}
          {Array.isArray(file) && file.length > 1 && (
            <BiRightArrowAlt
              onClick={() => setFileIndex((prev) => (prev + 1) % file.length)}
              className="md:text-main_dark_violet_color text-white text-3xl cursor-pointer top-[50%] right-4 absolute z-[50]"
            />
          )}

          {Array.isArray(file) && file.length > 1 && (
            <p className="absolute top-4 left-6 text-white md:text-main_dark_violet_color">
              {fileIndex + 1} / {file.length}
            </p>
          )}
        </div>
      )}

      {/* Bottom */}
      <div className="px-2 py-2 w-[90] gap-2  flex flex-wrap">
        <span className="text-gray-500">@{user.username}</span>{" "}
        <span className="text-md dark:text-white text-gray-700">{caption}</span>
      </div>
      <div className="flex items-center justify-between px-2">
        {/* Caption */}
        <div className="flex items-center dark:text-white text-3xl gap-4">
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
        <CiBookmarkPlus className="cursor-pointer dark:text-white text-3xl" />
      </div>
      <div className="px-4 py-2 flex flex-col">
        <p className="text-gray-500 text-sm">{likes} Likes</p>
        <p
          onClick={() => navigate("/comments")}
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
      {showPostOptionModal && (
        <div className=" flex flex-col gap-4 absolute right-4 top-12 bg-white shadow-xl rounded-xl p-2 ">
          <div className=" flex items-center gap-2 cursor-pointer">
            <BiPencil />
            <p>Edit</p>
          </div>
          <div className=" flex items-center gap-2 cursor-pointer">
            <BiShare />
            <p>Share</p>
          </div>
          <div className=" flex text-red-500 items-center gap-2 cursor-pointer">
            <PiTrash />
            <p>Delete</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostItem;

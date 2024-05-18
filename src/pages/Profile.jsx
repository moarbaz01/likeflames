import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import avatar2 from "../assets/avatars/avatar2.png";
import { PiNotePencilThin, PiShare, PiShareThin } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
// import Reels from "../components/Reels";
import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";
function Profile() {
  const bio =
    "👋 Hi there! I'm a software engineer 💻 passionate about coding and building cool projects. In my free time, you'll find me hiking 🏞️ or playing guitar 🎸. Let's connect!";
  const [showPost, setShowPost] = useState(true);
  const [showReplies, setShowReplies] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const navigate = useNavigate();

  return (
    <div className=" md:pb-0 pb-24 ">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="relative  mx-auto md:max-w-[1400px] md:px-4 mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] mx-2 md:mx-0 flex items-start justify-between gap-4 ">
          <div className=" w-full md:h-[90vh] rounded-xl overflow-y-scroll">
            {/* Top */}
            <div className=" flex flex-col bg-white px-2 py-2 rounded-xl w-full">
              <h1 className=" text-main_dark_violet_color font-[500] text-2xl">
                Sameer Khan
              </h1>
              <p className="  text-gray-400 font-[500] text-sm m-0">
                @Sameer Khan
              </p>
            </div>
            <div className=" flex justify-evenly bg-white rounded-xl mt-4 py-4 lg:flex-row flex-col items-center w-full">
              <div className="relative mx-2">
                <img
                  src={avatar2}
                  className=" md:size-32 size-40 border-main_dark_violet_color hover:opacity-80 transition cursor-pointer border-8 shadow-2xl shadow-white rounded-full"
                  alt=""
                />

                <CiEdit className=" absolute bottom-0 right-0 text-2xl cursor-pointer" />
              </div>

              <div className=" flex justify-between mx-2 gap-16 mt-6 ">
                <div className=" flex items-center cursor-pointer gap-1 flex-col">
                  <h1 className=" text-main_dark_violet_color md:text-5xl text-6xl font-[500]">
                    0
                  </h1>
                  <p className=" text-text_black text-sm font-[500]">Posts</p>
                </div>
                <div className=" flex items-center gap-1 flex-col cursor-pointer">
                  <h1 className=" text-main_dark_violet_color md:text-5xl text-6xl font-[500]">
                    23
                  </h1>
                  <p className=" text-text_black text-sm font-[500]">
                    {" "}
                    Followers
                  </p>
                </div>
                <div className=" flex items-center gap-1 flex-col cursor-pointer">
                  <h1 className=" text-main_dark_violet_color md:text-5xl text-6xl font-[500]">
                    21
                  </h1>
                  <p className=" text-text_black text-sm font-[500]">
                    Following
                  </p>
                </div>
              </div>
              <div className=" flex items-center w-full  md:w-fit  justify-center gap-4 mt-6  ">
                <button
                  onClick={() => navigate("/profile/edit")}
                  className=" bg-main_dark_violet_color hover:bg-main_light_purple transition text-white border-[1px] flex items-center gap-2 border-main_dark_violet_color py-4 px-6 rounded-xl"
                >
                  <PiNotePencilThin className=" text-xl" />
                  <span>Edit</span>
                </button>
                <button className=" bg-white border-[1px] lg:hidden hover:bg-gray-50 transition flex items-center gap-2 border-black py-4 px-6 rounded-xl">
                  <PiShareThin className=" text-xl" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            {/* Social Media User info Info */}
            <div className=" flex flex-col bg-white px-4 py-4 mt-4 overflow-x-hidden rounded-xl w-full">
              <h1 className=" text-gray-400 font-[500] text-xl">Your Bio</h1>

              <p className="mt-4 text-gray-400 ">{bio}</p>
            </div>

            <div className=" flex bg-white px-4 py-2 mt-4 justify-between rounded-full  w-full">
              <div
                onClick={() => {
                  setShowPost(true);
                  setShowReplies(false);
                  setShowTags(false);
                }}
                className=" cursor-pointer"
              >
                <h1
                  className={`text-sm ${
                    !showPost ? "text-gray-500" : "text-main_dark_violet_color"
                  } `}
                >
                  POST
                </h1>
                {showPost && (
                  <div className=" bg-main_dark_violet_color h-1"></div>
                )}
              </div>
              <div
                onClick={() => {
                  setShowPost(false);
                  setShowReplies(true);
                  setShowTags(false);
                }}
                className=" cursor-pointer"
              >
                <h1
                  className={`text-sm ${
                    !showReplies
                      ? "text-gray-500"
                      : "text-main_dark_violet_color"
                  } `}
                >
                  REPLIES
                </h1>
                {showReplies && (
                  <div className=" bg-main_dark_violet_color h-1"></div>
                )}
              </div>
              <div
                onClick={() => {
                  setShowPost(false);
                  setShowReplies(false);
                  setShowTags(true);
                }}
                className=" cursor-pointer"
              >
                <h1
                  className={`text-sm ${
                    !showTags ? "text-gray-500" : "text-main_dark_violet_color"
                  } `}
                >
                  TAGS
                </h1>
                {showTags && (
                  <div className=" bg-main_dark_violet_color h-1"></div>
                )}
              </div>
            </div>
            <div className="mt-4 w-full">
              <Posts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

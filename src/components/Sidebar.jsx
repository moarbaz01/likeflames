import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import {
  CiHome,
  CiYoutube,
  CiGrid41,
  CiBookmark,
  CiLocationArrow1,
  CiSettings,
  CiBellOn,
} from "react-icons/ci";
import avatar2 from "../assets/avatars/avatar2.png";
import PostModal from "./PostModal";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import LoginModal from "./LoginModal";
import Breadcrumbs from "./Breadcrumbs";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const user = false;
  const pathname = useLocation().pathname;

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOpenSettingsModal = () => {
    setShowSettings(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettings(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navList = [
    {
      icon: <CiHome className=" text-xl" />,
      name: "Home",
      pathname: "/",
    },
    {
      icon: <CiYoutube className=" text-xl" />,
      name: "Feed",
      pathname: "/feed",
    },
    {
      icon: <CiGrid41 className=" text-xl" />,
      name: "Explore",
      pathname: "/explore",
    },
    ,
    {
      icon: <CiBellOn className=" text-xl" />,
      name: "Notifications",
      pathname: "/notifications",
    },
    // {
    //   icon: <CiBookmark className=" text-xl" />,
    //   name: "Saves",
    //   // pathname: "/saves",
    // },
    {
      icon: <CiLocationArrow1 className=" text-xl" />,
      name: "Messages",
      pathname: "/messages",
    },
    {
      icon: <CiSettings className=" text-xl" />,
      name: "Settings",
      handleClick: handleOpenSettingsModal,
      // pathname: "/settings",
    },
  ];
  return (
    <aside className=" absolute w-[280px] hidden top-0 left-4  md:flex items-start flex-col justify-center">
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center cursor-pointer  w-full py-2 px-4 mb-2 rounded-xl bg-main_bg_white gap-4"
      >
        <img src={avatar2} className="h-10 w-10 rounded-full" alt="" />
        <div className=" flex items-start flex-col">
          <h1 className=" font-[500]">Sameer Khan</h1>
          <p className=" text-sm text-slate-500">@sameerkhan</p>
        </div>
      </div>

      <ul className="flex items-start w-full py-6 px-6 rounded-xl mb-2 bg-main_bg_white gap-6 flex-col">
        {navList.map((item, index) => (
          <li
            onClick={
              item.handleClick
                ? item.handleClick
                : () => navigate(item.pathname)
            }
            key={index}
            className=" flex items-center relative cursor-pointer gap-2 w-full"
          >
            <div
              className={` ${
                pathname !== item.pathname && "hidden"
              } h-full w-1 bg-main_dark_violet_color absolute -left-4`}
            ></div>
            <div
              className={` ${
                pathname === item.pathname && " text-main_dark_violet_color"
              } `}
            >
              {item.icon}
            </div>
            <span
              className={` ${
                pathname === item.pathname && " text-main_dark_violet_color"
              } pl-3 font-[500]`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
      <div className=" w-full">   
        <button
          onClick={handleOpenModal}
          className=" rounded-full w-full transition hover:opacity-80  text-text_color py-2 px-4 bg-main_dark_violet_color border-none outline-none"
        >
          Create Post
        </button>
      </div>
      <SettingsModal isOpen={showSettings} onClose={handleCloseSettingsModal} />
      {user ? (
        <PostModal isOpen={showModal} onClose={handleCloseModal} />
      ) : (
        showModal && (
          <LoginModal isOpen={showModal} onClose={handleCloseModal} />
        )
      )}

      <div className="mt-6">
        <Breadcrumbs />
      </div>
    </aside>
  );
}

export default Sidebar;

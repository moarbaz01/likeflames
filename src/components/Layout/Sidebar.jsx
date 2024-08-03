// Sidebar.js
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CiHome,
  CiYoutube,
  CiGrid41,
  CiLocationArrow1,
  CiBellOn,
} from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BlankProfile from "../../assets/blankProfile.png";
import LoginModal from "../Modal/LoginModal";
import SelectPostTypeModal from "../Modal/SelectPostTypeModal";
import SidebarProfileSkeleton from "../Skeleton/SidebarProfileSkeleton";

const NavList = ({ navList, navigate, pathname }) => (
  <ul className="flex items-start w-full py-6 px-6 rounded-xl mb-2 dark:bg-dark_secondary_bg bg-main_bg_white gap-6 flex-col">
    {navList?.map(
      (item, index) =>
        !item.protected && (
          <li
            onClick={
              item.handleClick
                ? item.handleClick
                : () => navigate(item.pathname)
            }
            key={index}
            className="flex dark:text-white items-center relative cursor-pointer gap-2 w-full"
          >
            <div
              className={`${
                pathname !== item.pathname && "hidden"
              } h-full w-1 bg-main_dark_violet_color dark:bg-main_light_purple absolute -left-4`}
            ></div>
            <div
              className={`${
                pathname === item.pathname &&
                " text-main_dark_violet_color dark:text-main_light_purple"
              }`}
            >
              {item.icon}
            </div>
            <div
              className={`${
                pathname === item.pathname &&
                " text-main_dark_violet_color dark:text-main_light_purple"
              } pl-3 text-sm font-[500 flex items-center`}
            >
              <span>{item.name}</span>
              {item.notification && (
                <span className="ml-2 h-4 w-4 flex items-center justify-center bg-main_dark_violet_color text-white rounded-full text-[8px]">
                  {item.notification}
                </span>
              )}
            </div>
          </li>
        )
    )}
  </ul>
);

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { chats } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { user, isLoading } = useSelector((state) => state.user);
  const [skeletonLoading, setSkeletonLoading] = useState(false);

  const handleOpenModal = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const groupUnreadMessage = useMemo(
    () =>
      chats?.filter((chat) => {
        if (chat.to._id === user?._id) {
          return !chat.isRead;
        }
      }),
    [chats, user?._id]
  );

  const groupUsersByUnreadMessage = useMemo(() => {
    let tempUsers = [];
    groupUnreadMessage?.forEach((chat) => {
      if (!tempUsers.includes(chat.to._id)) {
        tempUsers.push(chat.to._id);
      }
    });

    return tempUsers;
  }, [groupUnreadMessage]);

  const handleNavigateProfile = useCallback(() => {
    if (!user) return;
    navigate(`/profile/${user?._id}`);
  }, [user, navigate]);

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
    {
      icon: <CiBellOn className=" text-xl" />,
      name: "Notifications",
      pathname: "/notifications",
      notification: user?.notifications?.length || null,
      protected: user ? false : true,
    },
    {
      icon: <CiLocationArrow1 className=" text-xl" />,
      name: "Chats",
      pathname: "/chat/selectUser",
      notification: groupUsersByUnreadMessage?.length || null,
      protected: user ? false : true,
    },
  ];

  useEffect(() => {
    setSkeletonLoading(true);
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1000);
    () => {
      return clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <aside className="md:flex hidden md:w-[30vw] sticky z-0 top-0 h-full lg:w-[20vw] flex-col">
        {skeletonLoading ? (
          <SidebarProfileSkeleton />
        ) : (
          <div
            onClick={handleNavigateProfile}
            className="flex items-center cursor-pointer w-full py-2 px-4 mb-2 rounded-xl dark:shadow-lg dark:bg-dark_secondary_bg bg-main_bg_white gap-4"
          >
            <img
              src={user?.profilePicture || BlankProfile}
              className="h-10 w-10 aspect-square object-cover rounded-full"
              alt=""
            />
            <div className="flex items-start flex-col">
              <h1 className="font-[500] dark:text-white">
                {user?.name || "Guest Account"}
              </h1>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                @{user?.username || "guestaccount"}
              </p>
            </div>
          </div>
        )}
        <NavList navList={navList} pathname={pathname} navigate={navigate} />

        <div className="w-full">
          <button
            onClick={handleOpenModal}
            className="rounded-full w-full transition hover:opacity-80 text-text_color py-2 px-4 bg-main_dark_violet_color border-none outline-none"
          >
            Create Post
          </button>
        </div>

        {/* <div className="mt-6 w-full">
          <Breadcrumbs />
        </div> */}
      </aside>
      <SelectPostTypeModal isOpen={showModal} onClose={handleCloseModal} />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default Sidebar;

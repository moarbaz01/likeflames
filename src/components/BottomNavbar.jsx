import React, { useEffect, useState } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { CiHome, CiLocationArrow1, CiSearch, CiUser } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { PiPencil, PiPictureInPictureBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const toolsModal = () => {
  return (
    <div className="">
      <div className=" bg-pink-500 text-white text-2xl cursor-pointer animate-scaleUp flex items-center justify-center rounded-full w-16 h-16 absolute -top-20 -left-20  border-white border-2">
        <PiPictureInPictureBold />
      </div>
      <div className=" bg-green-500 text-white text-2xl flex cursor-pointer animate-scaleUp items-center justify-center rounded-full w-16 h-16 absolute -top-20  border-white border-2">
        <FiSettings />
      </div>
      <div className=" bg-red-500 text-white text-2xl flex animate-scaleUp cursor-pointer items-center justify-center rounded-full w-16 h-16 absolute -top-20 -right-20  border-white border-2">
        <BiVideoPlus />
      </div>
    </div>
  );
};

const navigationData = [
  {
    pathname: "/",
    icon: <CiHome className=" text-2xl" />,
    title: "Home",
  },
  {
    pathname: "/explore",
    icon: <CiSearch className=" text-2xl" />,
    title: "Explore",
  },
  {
    pathname: "/messages",
    icon: <CiLocationArrow1 className=" text-2xl" />,
    title: "Messages",
  },
  {
    pathname: "/profile",
    icon: <CiUser className=" text-2xl" />,
    title: "Account",
  },
];

function BottomNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [showTools, setShowTools] = React.useState(false);

  useEffect(() => {
    setShowTools(false);
  }, [location.pathname]);

  return (
    <div className=" bg-white h-20 fixed md:hidden rounded-t-3xl  border-t-2 border-t-gray-200 w-full bottom-0 left-0 z-[999]">
      <div className=" flex items-center my-2 mx-4 justify-around">
        {/* Home Navigation */}

        {navigationData.map((item, index) => (
          <React.Fragment key={index}>
            <Link
              to={item.pathname}
              className={` flex items-center ${
                pathname === item.pathname && "text-main_dark_violet_color"
              } font-[500] flex-col justify-center gap-2`}
            >
              {item.icon}
              <p className=" text-xs">{item.title}</p>
            </Link>

            {index === 1 && (
              <div className="relative -translate-y-8">
                <div
                  onClick={() => setShowTools(!showTools)}
                  className="h-16 w-16 border-4 border-white rounded-full bg-main_dark_violet_color text-white text-3xl flex items-center justify-center"
                >
                  <PiPencil />
                </div>
                {showTools && toolsModal()}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default BottomNavbar;

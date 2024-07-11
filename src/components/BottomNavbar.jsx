import React, { useState } from "react";
import { CiHome, CiLocationArrow1, CiSearch, CiUser } from "react-icons/ci";
import { PiPencil } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SelectPostTypeModal from "./SelectPostTypeModal";
import { hiddenBottomNavbar } from "../data";

function BottomNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [showSelectPostTypeModal, setShowSelectPostTypeModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  // Navigation Data
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
      pathname: `/profile/${user?._id}`,
      icon: <CiUser className=" text-2xl" />,
      title: "Account",
    },
  ];

  // Hide Navbar for specific paths
  const shouldHideBottomNavbar = hiddenBottomNavbar?.some((path) =>
    pathname.startsWith(path)
  );

  const closeSelectPostTypeModal = () => {
    setShowSelectPostTypeModal(false);
  };

  if (shouldHideBottomNavbar) return null;

  return (
    <>
      <div className=" bg-white dark:bg-dark_main_bg h-20 fixed md:hidden border-t-2 dark:border-t-main_dark_violet_color border-t-gray-200 w-full bottom-0 left-0 z-[999]">
        <div className=" flex items-center my-2 mx-4 justify-around">
          {/* Home Navigation */}

          {navigationData.map((item, index) => (
            <React.Fragment key={index}>
              <Link
                to={item.pathname}
                className={` flex items-center ${
                  pathname === item.pathname
                    ? "text-main_dark_violet_color"
                    : "dark:text-white"
                }  font-[500] flex-col justify-center gap-2`}
              >
                {item.icon}
                <p className=" text-xs">{item.title}</p>
              </Link>

              {index === 1 && (
                <div className="relative -translate-y-8">
                  <div
                    onClick={() =>
                      setShowSelectPostTypeModal(!showSelectPostTypeModal)
                    }
                    className="h-16 w-16 border-4 border-white rounded-full bg-main_dark_violet_color text-white text-3xl flex items-center justify-center"
                  >
                    <PiPencil />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <SelectPostTypeModal
        isOpen={showSelectPostTypeModal}
        onClose={() => closeSelectPostTypeModal()}
      />
    </>
  );
}

export default BottomNavbar;

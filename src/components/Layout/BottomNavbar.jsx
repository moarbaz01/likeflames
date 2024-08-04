import React, { useMemo, useState } from "react";
import { CiHome, CiLocationArrow1, CiSearch, CiUser } from "react-icons/ci";
import { PiPencil } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SelectPostTypeModal from "../Modal/SelectPostTypeModal";
import { hiddenBottomNavbar } from "../../data";

function BottomNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [showSelectPostTypeModal, setShowSelectPostTypeModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);

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
      notification: groupUsersByUnreadMessage?.length || null,
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
                }  font-[500] flex-col relative justify-center gap-2`}
              >
                {item.icon}
                <p className=" text-xs">{item.title}</p>
                {item?.notification && (
                  <span className="ml-2 h-4 w-4 flex items-center absolute justify-center top-0 right-2 bg-main_dark_violet_color text-white rounded-full text-[8px]">
                    {item.notification}
                  </span>
                )}
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

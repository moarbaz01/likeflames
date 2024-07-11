import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useMemo, useState } from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../context/useTheme";
import BlankProfile from "../assets/blankProfile.png";
import { useSelector } from "react-redux";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { theme, handleTheme } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <div
      className={` bg-main_bg_white dark:bg-main_dark_violet_color md:flex items-center z-[999] fixed top-0 py-4 w-full px-4 md:px-8`}
    >
      <div className=" flex items-center h-full w-full my-auto justify-between">
        <h1
          onClick={() => navigate("/")}
          className=" text-2xl font-bold cursor-pointer dark:text-white text-main_dark_violet_color"
        >
          LikeFlames
        </h1>
        <div className=" md:flex items-center py-1 rounded-full hidden bg-slate-200 w-[40%] p-1">
          <CiSearch className=" text-xl font-[500] mx-4" />
          <input
            className=" bg-transparent w-[80%] pr-2 outline-none"
            type="text"
            name="search"
            placeholder="Search for creators, products"
          />
        </div>

        <div className=" flex items-center gap-4  relative">
          <img
            onClick={dropdownHandler}
            className=" h-10 w-10 hidden md:block cursor-pointer  rounded-full"
            src={user?.profilePicture ? user?.profilePicture : BlankProfile}
            alt=""
          />
          <div className="flex items-center relative  md:hidden ">
            <CiBellOn
              onClick={() => navigate("/notifications")}
              className=" text-4xl dark:text-white"
            />
            {user?.notifications?.length > 0 && (
              <div className=" bg-main_dark_violet_color dark:bg-white dark:text-black absolute rounded-full h-4 w-4 top-0 right-0 text-white flex items-center justify-center text-[10px]">
                {user.notifications.length}
              </div>
            )}
          </div>
          <div onClick={handleTheme} className="flex text-3xl items-center ">
            {theme === "light" && (
              <MdDarkMode className=" cursor-pointer text-black" />
            )}
            {theme === "dark" && (
              <MdLightMode className=" cursor-pointer text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

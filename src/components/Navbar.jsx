import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { CiBellOn, CiDark, CiLight, CiSearch } from "react-icons/ci";
import avatar2 from "../assets/avatars/avatar2.png";
import PostModal from "./PostModal";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { ThemeContext } from "../context/useTheme";

function Navbar() {
  const [dropdown, setDropdown] = React.useState(false);
  const { theme,setTheme } = useContext(ThemeContext);
  const [themeMode, setThemeMode] = React.useState(theme);
  const navigate = useNavigate();

  const handleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    setTheme(newTheme);
    console.log(newTheme);
  };

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className=" bg-main_bg_white dark:bg-main_dark_violet_color left-0 h-16 w-full  px-4 md:px-8">
      <div className=" flex items-center  h-full my-auto justify-between">
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
            className=" h-10 w-10 hidden md:block cursor-pointer"
            src={avatar2}
            alt=""
          />
          <div className="flex items-center relative  md:hidden ">
            <CiBellOn
              onClick={() => navigate("/notifications")}
              className=" text-4xl dark:text-white"
            />
            <div className=" bg-main_dark_violet_color dark:bg-white dark:text-black absolute rounded-full h-4 w-4 top-0 right-0 text-white flex items-center justify-center text-[10px]">
              2
            </div>
          </div>
          <div onClick={handleTheme} className="flex text-3xl items-center ">
            {themeMode === "light" && (
              <MdDarkMode className=" cursor-pointer text-black" />
            )}
            {themeMode === "dark" && (
              <MdLightMode className=" cursor-pointer text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

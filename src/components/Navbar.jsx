import { useNavigate } from "react-router-dom";
import React from "react";
import { CiBellOn, CiSearch } from "react-icons/ci";
import avatar2 from "../assets/avatars/avatar2.png";
import PostModal from "./PostModal";

function Navbar() {
  const [dropdown, setDropdown] = React.useState(false);
  const navigate = useNavigate();

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className=" bg-main_bg_white left-0 h-16 w-full  px-4 md:px-8">
      <div className=" flex items-center h-full my-auto justify-between">
        <h1
          onClick={() => navigate("/")}
          className=" text-2xl font-bold cursor-pointer text-main_dark_violet_color"
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

        <div className=" md:flex items-center hidden relative  gap-7">
          <img
            onClick={dropdownHandler}
            className=" h-10 w-10 cursor-pointer"
            src={avatar2}
            alt=""
          />
        </div>
        <div className=" md:hidden flex items-center relative">
          <CiBellOn
            onClick={() => navigate("/notifications")}
            className=" text-3xl"
          />
          <div className=" bg-main_dark_violet_color absolute rounded-full h-4 w-4 top-0 right-0 text-white flex items-center justify-center text-[10px]">
            2
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

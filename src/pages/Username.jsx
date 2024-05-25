import React from "react";
import downHand from "../assets/down_hand.png";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
function Username() {
  const [username, setUsername] = React.useState("");

  // Handle Submit
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" px-4 md:w-1/3 rounded-md flex justify-center flex-col "
      >
        <Link className=" flex items-center gap-4 mb-2 text-text_black text-xl">
          <FaArrowLeft className=" text-main_dark_violet_color" />
          <span className="text-lg text-text_black dark:text-white">Prev</span>
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black font-[500] dark:text-white">Enter a username</span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="text"
          name="username"
          className=" my-2 bg-transparent w-full dark:text-white text-black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          placeholder="Username"
          onChange={handleChange}
          value={username}
        />

        <button
          type="submit"
          className="w-full rounded-sm mt-4 h-12 bg-main_dark_violet_color text-white font-bold"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}

export default Username;

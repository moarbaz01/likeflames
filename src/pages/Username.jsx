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
    <div className="flex items-center justify-center h-screen max-w-screen">
      <form
        onSubmit={handleSubmit}
        className="py-12 px-12 w-[90%] sm:w-[40%] lg:w-[30%] rounded-md flex justify-center flex-col "
      >
        <Link className=" flex items-center gap-4 mb-2 text-text_black text-xl">
          <FaArrowLeft className=" text-main_dark_violet_color" />
          <span className="text-lg text-text_black">Prev</span>
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black font-[500]">Enter a username</span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="text"
          name="username"
          className=" my-2 bg-transparent w-full text-black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
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

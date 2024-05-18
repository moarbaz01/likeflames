import React from "react";
import downHand from "../assets/down_hand.png";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Password() {
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [eye, setEye] = React.useState(false);

  // Handle Submit
  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
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
        <Link className=" flex items-center gap-4 mb-4 text-text_black text-xl">
          <FaArrowLeft className=" text-main_dark_violet_color" />
          <span className="text-lg">Prev</span>
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black font-[500]">Set Password</span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="password"
          name="password"
          className=" my-2 bg-transparent w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          onChange={handleChange}
          value={password}
        />
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black font-[500]">Confirm Password</span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <div className=" relative">
          <input
            type={!eye ? "password" : "text"}
            name="confirmPassword"
            className="bg-transparent w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            onChange={handleChange}
            value={confirmPassword}
          />
          {eye && (
            <FaRegEye
              onClick={() => setEye(false)}
              className=" text-main_dark_violet_color absolute right-4 top-6 cursor-pointer"
            />
          )}
          {!eye && (
            <FaRegEyeSlash
              onClick={() => setEye(true)}
              className=" text-main_dark_violet_color absolute right-4 top-6 cursor-pointer"
            />
          )}
        </div>

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

export default Password;

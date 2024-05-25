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
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" px-4 md:w-1/3 rounded-md flex justify-center flex-col "
      >
        <Link className=" flex items-center gap-4 mb-4 text-text_black text-xl">
          <FaArrowLeft className=" text-main_dark_violet_color" />
          <span className="text-lg dark:text-white">Prev</span>
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black font-[500] dark:text-white">
            Set Password
          </span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="password"
          name="password"
          className=" my-2 bg-transparent w-full text-text_black dark:text-white border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          onChange={handleChange}
          value={password}
        />
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black dark:text-white font-[500]">
            Confirm Password
          </span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <div className=" relative">
          <input
            type={!eye ? "password" : "text"}
            name="confirmPassword"
            className="bg-transparent w-full text-text_black dark:text-white border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            onChange={handleChange}
            value={confirmPassword}
          />
          {eye && (
            <FaRegEye
              onClick={() => setEye(false)}
              className=" text-main_dark_violet_color dark:text-white absolute right-4 top-6 cursor-pointer"
            />
          )}
          {!eye && (
            <FaRegEyeSlash
              onClick={() => setEye(true)}
              className=" text-main_dark_violet_color dark:text-white absolute right-4 top-6 cursor-pointer"
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

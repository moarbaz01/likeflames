import React, { useContext, useEffect } from "react";
import downHand from "../assets/down_hand.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SignupContext } from "../context/useSignup";
import toast from "react-hot-toast";

function Username() {
  const { name, setName, sessionExpiredHandler , email} = useContext(SignupContext);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      return toast.error("Name is required");
    }

    // Username should not start with number
    if (/^[0-9]/.test(name)) {
      return toast.error("Name should not start with a number");
    }

    // Username should not start with underscores
    if (/^_/.test(name)) {
      return toast.error("Name should not start with underscores");
    }

    // Valid username
    if (name.length < 3) {
      return toast.error("Name must be at least 8 characters long");
    }

    // username should not contain special characters excepts space
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      return toast.error("Name should not contain special characters");
    }

    if (email === "") {
      sessionExpiredHandler();
    } else {
      navigate("/password");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col"
      >
        <div
          onClick={() => navigate("/username")}
          className="flex items-center gap-4 mb-2 text-text_black text-xl"
        >
          <FaArrowLeft className="text-main_dark_violet_color" />
          <span className="text-lg text-text_black dark:text-white">Prev</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black font-[500] dark:text-white">
            Enter your name
          </span>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="text"
          name="name"
          className="my-2 bg-transparent w-full dark:text-white text-black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
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

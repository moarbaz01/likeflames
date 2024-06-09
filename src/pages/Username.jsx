import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import downHand from "../assets/down_hand.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SignupContext } from "../context/useSignup";
import apiRequest from "../services/apiRequest";
import { FETCH_ALL_USERS } from "../services/api";
import toast from "react-hot-toast";

function Username() {
  const { email, username, setUsername, sessionExpiredHandler } =
    useContext(SignupContext);
  const [allAvailableUsers, setAllAvailableUsers] = useState([]);
  const navigate = useNavigate();

  const handleFetchUsers = async () => {
    try {
      const res = await apiRequest({ method: "get", url: FETCH_ALL_USERS });
      setAllAvailableUsers(res.data.users);
    } catch (error) {
      console.log(error);
      setAllAvailableUsers([]);
    }
  };

  const isUniqueUsername = useMemo(() => {
    if (allAvailableUsers.length !== 0) {
      return allAvailableUsers.every((user) => user.username !== username);
    }
    return true;
  }, [allAvailableUsers, username]);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length === 0) {
      return toast.error("Username is required");
    }

    // Username should not start with number
    if (/^[0-9]/.test(username)) {
      return toast.error("Username should not start with a number");
    }

    // Username should not start with underscores
    if (/^_/.test(username)) {
      return toast.error("Username should not start with underscores");
    }

    // Valid username
    if (username.length < 3) {
      return toast.error("Username must be at least 3 characters long");
    }

    // username should not contain special characters excepts under score
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return toast.error("Username should not contain special characters");
    }

    if (!isUniqueUsername) {
      return toast.error("Username is already taken");
    }

    if (email === "") {
      sessionExpiredHandler()
    } else {
      navigate("/name");
    }
    // Proceed to next step
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col"
      >
        <div
          onClick={() => navigate("/signup")}
          className="flex items-center gap-4 mb-2 text-text_black text-xl"
        >
          <FaArrowLeft className="text-main_dark_violet_color" />
          <span className="text-lg text-text_black dark:text-white">Prev</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black font-[500] dark:text-white">
            Enter a username
          </span>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="text"
          name="username"
          className="my-2 bg-transparent w-full dark:text-white text-black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {/* {isUniqueUsername && (
          <div className="flex items-center gap-2">
            <IoIosCheckmarkCircle
              fill={isUniqueUsername ? "lightgreen" : "gray"}
            />
            <p className="text-gray-200 text-xs">Unique</p>
          </div>
        )} */}
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

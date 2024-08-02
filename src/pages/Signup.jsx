import React, { useContext, useEffect, useMemo, useState } from "react";
import hand from "../assets/hand.png";
import { Link, useNavigate } from "react-router-dom";
import downHand from "../assets/down_hand.png";
import { SignupContext } from "../context/useSignup";
import toast from "react-hot-toast";
import apiRequest from "../services/apiRequest";
import { FETCH_ALL_USERS } from "../services/api";

// Email regex for gmail
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|icloud\.com|mail\.com|zoho\.com|protonmail\.com)$/;

function Signup() {
  const { email, setEmail } = useContext(SignupContext);
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

  const isEmailRegistered = useMemo(() => {
    if (allAvailableUsers.length !== 0) {
      return allAvailableUsers.every((user) => user.email !== email);
    }
    return true;
  }, [allAvailableUsers, email]);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isEmailRegistered) {
      toast.error("Email is already registered");
      return;
    }
    navigate("/username");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col "
      >
        <div className=" flex items-center gap-4">
          <h1 className="text-text_black dark:text-main_light_purple text-2xl font-[500]">
            Welcome
          </h1>
          <img className=" h-8 w-8" src={hand} alt="" />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black dark:text-white  font-[500]">
            Enter Your Email{" "}
          </span>
          <img className=" h-4 w-4" src={downHand} alt="" />
        </div>
        <div>
          <input
            type="text"
            name="email"
            className=" bg-transparent dark:text-white w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-sm mt-4 h-12 bg-main_dark_violet_color text-white font-bold"
        >
          SIGN UP
        </button>
        <div className=" flexflex-col gap-1 mt-4 ">
          <span className=" text-text_black dark:text-white">
            Already have an account ?{" "}
          </span>
          <Link
            to={"/login"}
            className="text-lg text-main_light_purple font-bold"
          >
            Login{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;

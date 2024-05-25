import React from "react";
import hand from "../assets/hand.png";
import downHand from "../assets/down_hand.png";
import lock from "../assets/lock.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaRegEye } from "react-icons/fa";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [eye, setEye] = React.useState(false);

  // Handle Submit
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name === "password") {
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
        <div className=" flex items-center gap-4">
          <h1 className=" text-text_black dark:text-main_light_purple text-2xl">Continue</h1>
          <img className=" h-8 w-8" src={hand} alt="" />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black dark:text-white font-[500]">Enter Your Email </span>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>
        <input
          type="text"
          name="email"
          className=" bg-transparent dark:text-white w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black dark:text-white font-[500]">
            Enter Your Password{" "}
          </span>
          <img className="h-4 w-4" src={lock} alt="" />
        </div>
        <div className=" relative">
          <input
            type={!eye ? "password" : "text"}
            name="password"
            className="bg-transparent w-full dark:text-white text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            placeholder="Password"
            onChange={handleChange}
            value={password}
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
          LOGIN
        </button>
        <div className=" flexflex-col gap-1 mt-4 ">
          <span className="text-text_black dark:text-white">Create an new account ? </span>
          <Link
            to={"/signup"}
            className="text-lg text-main_light_purple font-bold"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

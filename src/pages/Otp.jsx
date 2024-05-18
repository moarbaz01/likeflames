import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import downHand from "../assets/down_hand.png";

function Otp() {
  const [otp, setOtp] = React.useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });
  const [fullOtp, setFullOtp] = useState("");

  // Handle Submit
  const handleChange = (e) => {
    const { value, name } = e.target;
    setOtp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const tempOtp = parseInt(otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4);
    setFullOtp(tempOtp);
  };

  return (
    <div className="flex items-center justify-center h-screen max-w-screen">
      <form
        onSubmit={handleSubmit}
        className="py-12 px-12 w-[80%]  md:max-w-[30%] rounded-md flex justify-center flex-col "
      >
        <div className=" flex items-center gap-4">
          <h1 className=" text-text_black font-[500] text-2xl">Enter 4 Digit OTP</h1>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>

        <div className=" flex items-center mt-4 justify-between">
          <input
            type="text"
            name="otp1"
            className=" bg-transparent text-3xl text-center w-12 h-12 md:w-16 md:h-16 text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color "
            onChange={handleChange}
            value={otp.otp1}
            maxLength={1}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
          <input
            type="text"
            name="otp2"
            className=" bg-transparent text-3xl text-center w-12 h-12 md:w-16 md:h-16 text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color "
            onChange={handleChange}
            value={otp.otp2}
            maxLength={1}
            pattern="[1-9]{1}[0-9]{9}"
          />
          <input
            type="text"
            name="otp3"
            className=" bg-transparent text-3xl text-center w-12 h-12 md:w-16 md:h-16 text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color "
            onChange={handleChange}
            value={otp.otp3}
            maxLength={1}
            pattern="[1-9]{1}[0-9]{9}"
          />
          <input
            type="text"
            name="otp4"
            className=" bg-transparent text-3xl text-center w-12 h-12 md:w-16 md:h-16 text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color "
            onChange={handleChange}
            value={otp.otp4}
            maxLength={1}
            pattern="[1-9]{1}[0-9]{9}"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md mt-4 h-12 bg-main_dark_violet_color transition hover:opacity-90 text-white font-bold"
        >
          SUBMIT OTP
        </button>
        <span
          to={"/"}
          className="text-sm w-fit mt-2 hover:opacity-70 transition cursor-pointer text-main_light_purple font-bold"
        >
          Resend OTP
        </span>
      </form>
    </div>
  );
}

export default Otp;

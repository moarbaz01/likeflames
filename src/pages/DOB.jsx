import React from "react";
import downHand from "../assets/down_hand.png";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function DOB() {
  const [startDate, setStartDate] = React.useState(new Date());

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen max-w-screen">
      <form
        onSubmit={handleSubmit}
        className="shadow-sm  py-12 px-12 w-[90%] sm:w-[40%] lg:w-[30%] rounded-md flex justify-center flex-col "
      >
        <Link className=" flex items-center justify-between mb-4 text-white text-xl">
          <div className="flex items-center gap-2">
            <FaArrowLeft className=" text-main_dark_violet_color" />
            <span className="text-lg">Prev</span>
          </div>
          <div className="flex justify-center h-8 py-2 px-4 bg-main_dark_violet_color text-white">
            <span className="text-sm">Skip</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <span className=" text-white">Select Birth</span>
          <img className=" h-4 w-4" src={downHand} alt="" />
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

export default DOB;

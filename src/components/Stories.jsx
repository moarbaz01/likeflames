import { stories } from "../data";
import React from "react";
import Story from "./Story";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Stories() {
  return (
    <div className=" w-full flex items-center">
      <div className=" bg-main_dark_violet_color text-text_color w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-main_light_purple transition rounded-full mr-4">
        <FaArrowLeft />
      </div>
      <div className="flex items-center gap-4 my-2">
        {stories?.map((r, index) => {
          return (
            <Story key={index} profile={r.profile} bg={r.bg} name={r.name} />
          );
        })}
      </div>
      <div className=" bg-main_dark_violet_color text-text_color w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-main_light_purple transition rounded-full ml-4">
        <FaArrowRight />
      </div>
    </div>
  );
}

export default Stories;

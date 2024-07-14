import React from "react";
import { FcCallTransfer, FcEndCall } from "react-icons/fc";
import { IoCall } from "react-icons/io5";
import { MdCallEnd, MdCallReceived } from "react-icons/md";

function CallModal({ isOpen, onClose, avatar, user }) {
    if (!isOpen) return null;
  return (
    <div className="fixed flex items-center justify-center  left-0 right-0 top-0 bottom-0 w-full z-[1000] bg-black/40">
      <div className="h-1/3 flex flex-col items-center p-2 justify-center rounded-xl relative md:h-1/3 md:w-1/3 lg:h-1/4 w-[90%] lg:w-1/4 bg-white">
        <img src={user.avatar} className="h-24 w-24 rounded-full " alt="" />
        <h1 className="mt-2">{user.name} Calling...</h1>
        <div className="flex items-center mt-6 gap-4 ">
          <button className=" h-12 px-6 bg-green-500 flex items-center gap-2 text-white p-1 rounded-xl">
            <IoCall className="text-2xl" />
            <span>Accept</span>
          </button>
          <button className=" h-12 px-6 bg-red-500 flex items-center gap-2 text-white p-1 rounded-xl">
            <MdCallEnd className="text-2xl " />
            <span>Reject</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallModal;

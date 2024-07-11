import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRelativeTime from "../hooks/useRelativeTime";
import { useSelector } from "react-redux";

function UserMessageItem({
  avatar,
  name,
  lastMsg,
  newMessages,
  time,
  mode,
  selected,
  userId,
  onClick,
}) {
  const navigate = useNavigate();
  const relativeTime = useRelativeTime(new Date(time));
  const { connectedUsers } = useSelector((state) => state.connectedUsers);
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const groupUnreadMessage = useMemo(() => {
    return chats.filter((chat) => {
      return chat.from?._id === userId && !chat.isRead
    })
  }, [chats, userId]);

  const handlerOnClick = () => {
    if (!mode) {
      navigate(`/chat/${userId}`);
    } else {
      onClick();
    }
  };
  return (
    <div
      onClick={handlerOnClick}
      className={`flex w-full items-end cursor-pointer ${mode
        ? selected
          ? "bg-main_light_purple"
          : "bg-white dark:bg-dark_secondary_bg"
        : "bg-white dark:bg-dark_secondary_bg"
        } transition w-full rounded-xl p-4 justify-between`}
    >
      <div className=" flex items-center gap-4">
        <div className="relative h-10 w-10 ">
          <img className=" w-full h-full rounded-full" src={avatar} alt="" />
          {connectedUsers[userId] && (
            <div className="h-4 w-4 bg-green-500 rounded-full absolute bottom-0 -right-1 border-2 border-main_dark_violet_color"></div>
          )}
        </div>
        <div className=" flex flex-col text-black ">
          <p className="font-[500] text-sm text-ellipsis dark:text-white overflow-x-hidden text-nowrap">
            {name}
            {""}
          </p>
          <p className="text-ellipsis text-sm dark:text-white overflow-x-hidden text-nowrap">
            {lastMsg?.split("").splice(0, 20).join("")}...
          </p>
        </div>
      </div>
      <div className=" flex items-center text-sm gap-4">
        {groupUnreadMessage?.length > 0 && (
          <span className=" h-6 w-6 flex items-center justify-center bg-main_dark_violet_color text-white rounded-full text-[8px]">
            {groupUnreadMessage?.length}
          </span>
        )}
        <p className="dark:text-white">{relativeTime}</p>
      </div>
    </div>
  );
}

export default UserMessageItem;

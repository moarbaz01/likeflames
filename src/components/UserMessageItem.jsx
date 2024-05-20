import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserMessageItem({
  avatar,
  name,
  lastMsg,
  newMessages,
  time,
  mode,
  selected,
}) {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const handlerOnClick = () => {
    !mode && navigate("/chat");
    selected(count);
    setCount(count === 1 ? -1 : 1);
  };

  useEffect(() => {
    if (!mode) {
      setCount(1);
    }
  }, [mode]);

  return (
    <div
      onClick={handlerOnClick}
      className={`flex items-end cursor-pointer ${
        mode
          ? count === -1
            ? "bg-main_light_purple"
            : "bg-white dark:bg-dark_secondary_bg"
          : "bg-white dark:bg-dark_secondary_bg"
      } transition dark:drop-shadow-md w-full rounded-xl py-4 px-2 justify-between`}
    >
      <div className=" flex items-center gap-4">
        <div className="relative  h-[50px] w-[50px]">
          <img className=" w-full h-full rounded-full" src={avatar} alt="" />
          <div className="h-4 w-4 bg-green-500 rounded-full absolute bottom-0 -right-1 border-2 border-main_dark_violet_color"></div>
        </div>
        <div className=" flex flex-col w-[150px]  text-black">
          <p className=" ml-2 text-ellipsis dark:text-white overflow-x-hidden text-nowrap">
            {name}
            {""}
          </p>
          <p className=" ml-2 text-ellipsis dark:text-white overflow-x-hidden text-nowrap">
            {lastMsg}
          </p>
        </div>
      </div>
      <div className=" flex items-center gap-4">
        <p className=" text-main_dark_violet_color dark:text-main_light_purple text-nowrap">
          {newMessages} New
        </p>
        <p className="dark:text-white">{time}</p>
      </div>
    </div>
  );
}

export default UserMessageItem;

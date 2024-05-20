import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CiEdit, CiSearch } from "react-icons/ci";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import UserMessageItem from "../components/UserMessageItem";

const chatData = [
  {
    name: "Sameer Khan",
    avatar: avatar2,
    lastMsg: "Hey, how are you? bhai",
    time: "2h",
    newMessages: 2,
  },
  {
    name: "Hari Om",
    avatar: avatar3,
    lastMsg: "image...",
    time: "1h",
    newMessages: 1,
  },
];

function Messages() {
  const [search, setSearch] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelected = (value) => {
    setSelected((prev) => prev + value);
  };
  const handleChangeMode = () => {
    setEditMode(!editMode);
    setSelected(0);
  };

  return (
    <div className=" md:pb-0 pb-24 ">
      <div className=" hidden md:block">
        <Navbar />
      </div>
      <div className="relative mx-auto max-w-[1400px] mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] mx-2 md:mr-6  flex justify-between gap-4 ">
          {/* Followers Messages */}
          <div className=" md:p-2 w-full">
            {/* Heading */}
            <div className="flex items-center justify-between">
              <h1 className=" md:text-2xl text-3xl dark:text-white font-[500]">
                Messages
              </h1>
              <CiEdit
                onClick={handleChangeMode}
                className=" text-2xl dark:text-white cursor-pointer hover:text-red-500"
              />
            </div>
            {/* Search bar */}
            <div className=" flex items-center my-4 gap-2">
              <input
                type="text"
                name="search"
                className=" w-full text-text_black border-2 dark:bg-dark_secondary_bg dark:text-white border-main_light_purple rounded-md focus:outline-main_dark_violet_color p-2"
                placeholder="Search"
                onChange={handleChange}
                value={search}
              />
              <div className=" bg-main_dark_violet_color p-2 text-white rounded-full">
                <CiSearch className="cursor-pointer text-2xl" />
              </div>
            </div>
            {/* Horizontal Line */}
            <div className=" h-[2px] w-full bg-main_light_purple my-4 rounded-full" />

            {/* Edit Options */}
            {editMode && (
              <div className="flex animate-slideDown items-center gap-2 w-full mb-2 px-2 justify-between">
                <p className="dark:text-white">{selected} Selected</p>
                <div>
                  <button className="h-10 px-2 bg-red-500 mr-2 text-white rounded-lg ">
                    Delete
                  </button>
                  <button className="h-10 px-2 bg-red-500 text-white rounded-lg">
                    Delete All
                  </button>
                </div>
              </div>
            )}

            {/* Chats */}
            <div className=" flex flex-col gap-4 ">
              {chatData.map((chat, index) => {
                return (
                  <UserMessageItem
                    key={index}
                    mode={editMode}
                    avatar={chat.avatar}
                    name={chat.name}
                    newMessages={chat.newMessages}
                    lastMsg={chat.lastMsg}
                    time={chat.time}
                    selected={handleSelected}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;

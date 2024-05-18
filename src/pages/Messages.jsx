import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CiEdit, CiSearch } from "react-icons/ci";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import { BiPhone, BiVideo } from "react-icons/bi";
import { BsSendArrowUp } from "react-icons/bs";
import DocsModal from "../components/DocsModal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RxCross1 } from "react-icons/rx";
import { MdEmojiEmotions } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Messages() {
  const [search, setSearch] = React.useState("");
  const [showDocsModal, setShowDocsModal] = React.useState(false);
  const [text, setText] = React.useState("");
  const [showPicker, setShowPicker] = React.useState(false);
  const navigate = useNavigate();

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
  };

  const handleOpenDocsModal = () => {
    setShowDocsModal(true);
  };

  const handleCloseDocsModal = () => {
    setShowDocsModal(false);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Sender and reciever messages
  const messagesData = [
    {
      sender: "Sameer Khan",
      avatar: avatar2,
      message: "Hey, how are you?",
      receiver: "me",
      time: "10:00 AM",
    },
    {
      sender: "me",
      avatar: avatar3,
      message: "I am fine, thank you!",
      receiver: "Sameer Khan",
      time: "10:24 AM",
    },
    {
      sender: "Sameer Khan",
      avatar: avatar2,
      message: "Hey, how are you?",
      receiver: "me",
      time: "10:00 AM",
    },
    {
      sender: "me",
      avatar: avatar3,
      message: "I am fine, thank you!",
      receiver: "Sameer Khan",
      time: "10:24 AM",
    },
    {
      sender: "Sameer Khan",
      avatar: avatar2,
      message: "Hey, how are you?",
      receiver: "me",
      time: "10:00 AM",
    },
    {
      sender: "me",
      avatar: avatar3,
      message: "I am fine, thank you!",
      receiver: "Sameer Khan",
      time: "10:24 AM",
    },
    {
      sender: "Sameer Khan",
      avatar: avatar2,
      message: "Hey, how are you?",
      receiver: "me",
      time: "10:00 AM",
    },
    {
      sender: "me",
      avatar: avatar3,
      message: "I am fine, thank you!",
      receiver: "Sameer Khan",
      time: "10:24 AM",
    },
    {
      sender: "Sameer Khan",
      avatar: avatar2,
      message: "Hey, how are you?",
      receiver: "me",
      time: "10:00 AM",
    },
    {
      sender: "me",
      avatar: avatar3,
      message: "I am fine, thank you!",
      receiver: "Sameer Khan",
      time: "10:24 AM",
    },
  ];

  const chatData = [
    {
      name: "Sameer Khan",
      avatar: avatar2,
      lastMsg: "Hey, how are you? bhai",
    },
    {
      name: "Hari Om",
      avatar: avatar3,
      lastMsg: "image...",
    },
  ];
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
              <h1 className=" md:text-2xl text-3xl font-[500]">Messages</h1>
              <CiEdit className=" text-2xl cursor-pointer" />
            </div>
            {/* Search bar */}
            <div className=" flex items-center my-4 gap-2">
              <input
                type="text"
                name="search"
                className=" w-full text-text_black border-2 border-main_light_purple rounded-md focus:outline-main_dark_violet_color p-2"
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

            {/* Chats */}
            <div className=" flex flex-col gap-4 ">
              {chatData.map((chat, index) => {
                return (
                  <div
                    onClick={() => navigate("/chat")}
                    key={index}
                    className=" flex items-end cursor-pointer hover:bg-main_light_purple transition w-full bg-white rounded-xl py-4 px-2 justify-between"
                  >
                    <div className=" flex items-center gap-4">
                      <div className="relative  h-[50px] w-[50px]">
                        <img
                          className=" w-full h-full rounded-full"
                          src={chat.avatar}
                          alt=""
                        />
                        <div className="h-4 w-4 bg-green-500 rounded-full absolute bottom-0 -right-1 border-2 border-main_dark_violet_color"></div>
                      </div>
                      <div className=" flex flex-col w-[150px]  text-black">
                        <p className=" ml-2 text-ellipsis overflow-x-hidden text-nowrap">
                          {chat.name}
                          {""}
                        </p>
                        <p className=" ml-2 text-ellipsis overflow-x-hidden text-nowrap">
                          {chat.lastMsg}
                        </p>
                      </div>
                    </div>
                    <div className=" flex items-center gap-4">
                      <p className=" text-main_dark_violet_color text-nowrap">
                        2 New
                      </p>
                      <p className="">2h</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <DocsModal isOpen={showDocsModal} onClose={handleCloseDocsModal} />
    </div>
  );
}

export default Messages;

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CiEdit, CiSearch } from "react-icons/ci";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import {
  BiDotsHorizontalRounded,
  BiFile,
  BiLeftArrowAlt,
  BiPhone,
  BiVideo,
} from "react-icons/bi";
import { BsSendArrowUp } from "react-icons/bs";
import DocsModal from "../components/DocsModal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RxCross1 } from "react-icons/rx";
import { MdEmojiEmotions } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ViewFileModal from "../components/ViewFileModal";
import iphoneAudio from "../assets/iphone_14.mp3";
import { PiTrash } from "react-icons/pi";

// Sender and reciever messages
const messagesData = [
  {
    sender: "Sameer Khan",
    avatar: avatar2,
    message: "Hey, how are you?",
    receiver: "me",
    time: "10:00 AM",
    type: "text",
  },
  {
    sender: "Sameer Khan",
    avatar: avatar2,
    url: "https://images.unsplash.com/photo-1714234073569-50c68b5feb4f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    receiver: "me",
    time: "10:00 AM",
    type: "img",
  },
  {
    sender: "Sameer Khan",
    avatar: avatar2,
    file: iphoneAudio,
    receiver: "me",
    time: "10:00 AM",
    type: "audio",
  },
  {
    sender: "me",
    avatar: avatar2,
    file: iphoneAudio,
    receiver: "me",
    time: "10:00 AM",
    type: "audio",
  },
  {
    sender: "me",
    avatar: avatar3,
    message: "I am fine, thank you!",
    receiver: "Sameer Khan",
    time: "10:24 AM",
    type: "text",
  },
  {
    sender: "me",
    avatar: avatar3,
    message: "I am fine, thank you!",
    receiver: "Sameer Khan",
    time: "10:24 AM",
    type: "text",
  },
  {
    sender: "me",
    avatar: avatar3,
    url: "https://plus.unsplash.com/premium_photo-1711508491199-facc407cf912?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    receiver: "Sameer Khan",
    time: "10:24 AM",
    type: "img",
  },
  {
    sender: "me",
    avatar: avatar3,
    url: [
      "https://plus.unsplash.com/premium_photo-1712416361680-660f671cd797?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1713955417511-f2bd115230a9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1713145872239-3c7930f592aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1714505026042-eee1eaa0b17f?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1675700385856-bfdb790f6758?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    receiver: "Sameer Khan",
    time: "10:24 AM",
    type: "img",
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

const messageOptionModal = (msg) => {
  if (
    msg.type === "img" ||
    msg.type === "docs" ||
    msg.type === "video" ||
    msg.type === "audio"
  ) {
    return (
      <div className=" flex  flex-col gap-4 bg-white shadow-xl rounded-2xl p-2 ">
        {/* <div className=" flex items-center gap-2 cursor-pointer"></div> */}
        <div className=" flex items-center gap-2 cursor-pointer">
          <BiLeftArrowAlt />
          <p>Reply</p>
        </div>
        <div className=" flex text-red-500 items-center gap-2 cursor-pointer">
          {/* Delete */}
          <PiTrash />
          <p>Delete</p>
        </div>
        <div className=" flex text-red-500 items-center gap-2 cursor-pointer">
          {/* Delete */}
          <PiTrash />
          <p>Delete Both Side</p>
        </div>
        <div className=" flex items-center gap-2 cursor-pointer">
          <BiFile />
          <p>Download</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex flex-col gap-4 bg-white shadow-xl rounded-2xl p-2 ">
        {/* <div className=" flex items-center gap-2 cursor-pointer"></div> */}
        <div className=" flex items-center gap-2 cursor-pointer">
          <BiLeftArrowAlt />
          <p>Reply</p>
        </div>
        <div className=" flex text-red-500 items-center gap-2 cursor-pointer">
          {/* Delete */}
          <PiTrash />
          <p>Delete</p>
        </div>
        <div className=" flex text-red-500 items-center gap-2 cursor-pointer">
          {/* Delete */}
          <PiTrash />
          <p>Delete Both Side</p>
        </div>
      </div>
    );
  }
};

function Chat() {
  const [search, setSearch] = React.useState("");
  const [showDocsModal, setShowDocsModal] = React.useState(false);
  const [text, setText] = React.useState("");
  const [showPicker, setShowPicker] = React.useState(false);
  const navigate = useNavigate();
  const lastMsgRef = React.useRef();
  const [showViewFileModal, setShowViewFileModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [showOptionModal, setShowOptionModal] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState(null);

  // Handler
  const handleShowOptionModal = (message) => {
    // setShowOptionModal(!showOptionModal);
    // If already true
    if (showOptionModal) {
      setShowOptionModal(false);
      return;
    }
    // If already false
    setShowOptionModal(true);
    setSelectedMessage(message);
  };

  const handleOpenViewFileModal = (file) => {
    setShowViewFileModal(true);
    setSelectedFile(file);
  };

  const handleCloseViewFileModal = () => {
    setShowViewFileModal(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    lastMsgRef.current.scrollIntoView();
  }, [chatData]);

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

  return (
    <div className=" md:pb-0">
      <div className=" hidden md:block">
        <Navbar />
      </div>
      <div className="relative mx-auto max-w-[1400px] md:mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] flex justify-between gap-4 ">
          <div className=" md:h-[90vh] pb-24 md:pb-10 relative  md:rounded-xl w-full md:w-full bg-white/25 dark:bg-white/10 md:mr-6 lg:w-[70%] ">
            {/* Messages Top */}
            <div className=" bg-main_dark_violet_color fixed z-[998] md:absolute top-0 left-0 w-full flex items-center justify-between py-2 px-2 md:px-4">
              <div className=" flex items-center gap-4">
                <div className=" flex items-center text-2xl  gap-2">
                  <BiLeftArrowAlt
                    className="text-white cursor-pointer"
                    onClick={() => navigate("/messages")}
                  />
                  <img
                    className=" h-[50px] w-[50px] rounded-full"
                    src={avatar2}
                    alt=""
                  />
                </div>
                <div className=" flex flex-col">
                  <p className=" text-white ml-2">Sameer Khan</p>
                  <p className=" text-white ml-2">Typing...</p>
                </div>
              </div>
              <div className="flex items-center text-3xl gap-2">
                <BiPhone fill="white" className=" cursor-pointer" stroke="4" />
                <BiVideo fill="white" className=" cursor-pointer" stroke="4" />
              </div>
            </div>
            <div className="w-full md:h-[80%] overflow-y-scroll px-4 mt-16">
              {messagesData.map((msg, index) => {
                if (msg.type === "text") {
                  return (
                    <div
                      key={index}
                      className={`flex items-center  ${
                        msg.sender === "me" && "justify-end"
                      } gap-2 my-4`}
                    >
                      <div
                        className={`${
                          msg.sender !== "me"
                            ? "bg-white text-black"
                            : "bg-main_dark_violet_color"
                        } flex flex-col px-4 py-2 relative rounded-2xl`}
                      >
                        <div
                          onClick={() => handleShowOptionModal(msg)}
                          className={`flex items-center  ${
                            msg.sender === "me" && " justify-end text-white"
                          } top-1 text-xl `}
                        >
                          <BiDotsHorizontalRounded className="cursor-pointer" />
                        </div>

                        {/* Modal */}
                        {showOptionModal && selectedMessage === msg && (
                          <div
                            className={`top-0 ${
                              msg.sender === "me" ? "-left-16" : "-right-16"
                            } absolute z-[999]`}
                          >
                            {messageOptionModal(msg)}
                          </div>
                        )}

                        <p className={`${msg.sender === "me" && "text-white"}`}>
                          {msg.message}
                        </p>
                        <p
                          className={`${
                            msg.sender === "me" && "text-white"
                          } text-xs`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  );
                } else if (msg.type === "img") {
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${
                        msg.sender === "me" && " justify-end"
                      }`}
                    >
                      <div
                        key={index}
                        className={`flex w-fit p-2 rounded-2xl flex-col ${
                          msg.sender === "me"
                            ? " bg-main_dark_violet_color "
                            : "bg-white"
                        } gap-2 relative my-4`}
                      >
                        <div
                          onClick={() => handleShowOptionModal(msg)}
                          className={`flex items-center  ${
                            msg.sender === "me" && " justify-end text-white"
                          } top-1 text-xl `}
                        >
                          <BiDotsHorizontalRounded className="cursor-pointer" />
                        </div>
                        {/* Modal */}
                        {showOptionModal && selectedMessage === msg && (
                          <div
                            className={`top-0 ${
                              msg.sender === "me" ? "-left-16" : "-right-16"
                            } absolute z-[999]`}
                          >
                            {messageOptionModal(msg)}
                          </div>
                        )}
                        {Array.isArray(msg.url) ? (
                          <div className="grid relative grid-cols-2 mt-1 gap-0">
                            {msg.url.map((url, index) => {
                              if (index < 4) {
                                return (
                                  <img
                                    key={index}
                                    className="w-[100px] cursor-pointer h-[100px] object-cover border-[1px] border-white"
                                    src={url}
                                    alt=""
                                    onClick={() =>
                                      handleOpenViewFileModal(msg.url)
                                    }
                                  />
                                );
                              }
                            })}
                            {msg.url.length > 4 && (
                              <div className="absolute h-12 w-12 text-black bottom-6 right-6 text-2xl flex items-center justify-center bg-white/50 rounded-full ">
                                {msg.url.length}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <img
                              className="w-[200px] cursor-pointer mt-1 rounded-xl"
                              src={msg.url}
                              alt=""
                              onClick={() => handleOpenViewFileModal(msg.url)}
                            />
                          </div>
                        )}

                        <div
                          className={`text-xs ${
                            msg.sender === "me" ? "float-right text-white" : ""
                          } mt-1`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  );
                } else if (msg.type === "audio") {
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${
                        msg.sender === "me" && " justify-end"
                      }`}
                    >
                      <div
                        key={index}
                        className={`flex w-fit p-2 rounded-2xl flex-col ${
                          msg.sender === "me"
                            ? " bg-main_dark_violet_color "
                            : "bg-white"
                        } gap-2 my-4 relative`}
                      >
                        <div
                          onClick={() => handleShowOptionModal(msg)}
                          className={`flex items-center  ${
                            msg.sender === "me" && " justify-end text-white"
                          } top-1 text-xl `}
                        >
                          <BiDotsHorizontalRounded className="cursor-pointer" />
                        </div>
                        {/* Modal */}
                        {showOptionModal && selectedMessage === msg && (
                          <div
                            className={`top-0 ${
                              msg.sender === "me" ? "-left-10" : "-right-10"
                            } absolute z-[999]`}
                          >
                            {messageOptionModal(msg)}
                          </div>
                        )}

                        {/* Audio */}
                        <audio
                          // Remove download button
                          download={false}
                          controls
                          className=" cursor-pointer w-[300px] mt-1 rounded-xl"
                          // Change button colors
                        >
                          <source src={msg.file} type="audio/mpeg" />
                        </audio>

                        {/* Message */}
                        <div
                          className={`text-xs ${
                            msg.sender === "me" ? "float-right text-white" : ""
                          } mt-1`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  );
                } else if (msg.type === "video") {
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${
                        msg.sender === "me" && " justify-end"
                      }`}
                    >
                      <div
                        key={index}
                        className={`flex w-fit p-2 rounded-2xl flex-col ${
                          msg.sender === "me"
                            ? " bg-main_dark_violet_color "
                            : "bg-white"
                        } gap-2 my-4 relative`}
                      >
                        <div
                          onClick={() => handleShowOptionModal(msg)}
                          className={`flex items-center  ${
                            msg.sender === "me" && " justify-end text-white"
                          } top-1 text-xl `}
                        >
                          <BiDotsHorizontalRounded className="cursor-pointer" />
                        </div>
                        {/* Modal */}
                        {showOptionModal && selectedMessage === msg && (
                          <div
                            className={`top-0 ${
                              msg.sender === "me" ? "-left-16" : "-right-16"
                            } absolute`}
                          >
                            {messageOptionModal(msg)}
                          </div>
                        )}

                        {/* Video */}

                        <video
                          controls
                          className=" cursor-pointer h-[300px] mt-1 rounded-xl"
                          // Change button colors
                        >
                          <source src={msg.file} type="audio/mpeg" />
                        </video>
                        <div className="flex flex-col py-2 rounded-full">
                          <p className="text-xs">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div ref={lastMsgRef}></div>
            </div>
            {/* Send Messages */}
            <div className="fixed md:absolute flex items-center py-2 px-4 bottom-2 left-0 w-full">
              <div
                onClick={handleOpenDocsModal}
                className=" flex items-center justify-center cursor-pointer hover:bg-main_light_purple transition  text-2xl h-12 text-white w-12 bg-main_dark_violet_color rounded-full"
              >
                +
              </div>
              <div className=" flex items-center ml-4 flex-[9] border-main_light_purple border-2 bg-white dark:bg-dark_secondary_bg  gap-4 rounded-xl md:py-4 px-2">
                <MdEmojiEmotions
                  className=" hidden md:block mb-6 dark:text-yellow-500 text-2xl cursor-pointer"
                  onClick={handleShowPicker}
                />
                <textarea
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setShowPicker(false)}
                  placeholder="Type a message"
                  className="text-text_black h-12 my-2  outline-none bg-transparent resize-none w-[90%] "
                />
                <BsSendArrowUp className=" mb-6 dark:text-white cursor-pointer text-xl" />
              </div>
            </div>
            {showPicker && (
              <div className="absolute bottom-16 right-10 z-[999] w-fit">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  // previewPosition="none"
                  theme="dark"
                  autoFocusSearch={false}
                />
                <RxCross1
                  className=" absolute top-1 text-xl cursor-pointer -right-8 "
                  onClick={handleShowPicker}
                />
              </div>
            )}
          </div>
          {/* Followers Messages */}
          <div className=" md:p-2 hidden md:hidden lg:block">
            {/* Search bar */}
            <div className=" flex items-center mb-4 gap-2">
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
                    key={index}
                    className=" flex items-end cursor-pointer dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-main_light_purple transition w-full bg-white rounded-xl py-4 px-2 justify-between"
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
                        <p className=" ml-2 text-ellipsis dark:text-white overflow-x-hidden text-nowrap">
                          {chat.name}
                          {""}
                        </p>
                        <p className=" ml-2 text-ellipsis dark:text-main_light_purple overflow-x-hidden text-nowrap">
                          {chat.lastMsg}
                        </p>
                      </div>
                    </div>
                    <div className=" flex items-center gap-4">
                      <p className=" text-main_dark_violet_color text-nowrap">
                        2 New
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <DocsModal isOpen={showDocsModal} onClose={handleCloseDocsModal} />
      <ViewFileModal
        isOpen={showViewFileModal}
        file={selectedFile}
        onClose={handleCloseViewFileModal}
      />
    </div>
  );
}

export default Chat;

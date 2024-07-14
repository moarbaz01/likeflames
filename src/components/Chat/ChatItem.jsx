import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { CiSaveDown1, CiTrash } from "react-icons/ci";
import { FiFile } from "react-icons/fi";
import useRelativeTime from "../../hooks/useRelativeTime";
import useGetFileType from "../../hooks/useGetFileType";
import ReactAudioPlayer from "react-audio-player";
import {
  DELETE_CHAT_BY_ALL,
  DELETE_CHAT_BY_ONE_SIDE,
  READ_CHAT,
} from "../../services/api";
import { useSelector } from "react-redux";
import apiRequest from "../../services/apiRequest";
import toast from "react-hot-toast";
import { fetchChats } from "../../redux/slicers/chat";
import { fetchUser } from "../../redux/slicers/user";
import useSocket from "../../hooks/useSocket";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const MessageOptions = ({ msg, direction, setShowOptions }) => {
  const { user, token } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const handleRealTimeChatUpdates = ({ user, id }) => {
    if (user) {
      socket.emit("send:chat", { from: user?._id, to: id });
    }
  };

  const handleDeleteChatByOneSide = useCallback(async () => {
    try {
      const res = await apiRequest({
        method: "delete",
        url: `${DELETE_CHAT_BY_ONE_SIDE}/${msg._id}`,
        token,
      });
      toast.success(res.data.message);
      dispatch(fetchChats(token));
      dispatch(fetchUser());
      console.log(res.data.message);
      setShowOptions(false);
    } catch (error) {
      console.log(error);
    }
  }, [msg, token, dispatch]);

  const handleDeleteChatByAll = useCallback(async () => {
    try {
      const res = await apiRequest({
        method: "delete",
        url: `${DELETE_CHAT_BY_ALL}/${msg._id}`,
        token,
      });
      toast.success(res.data.message);
      dispatch(fetchChats(token));
      dispatch(fetchUser());
      console.log(res.data.message);
      setShowOptions(false);
      handleRealTimeChatUpdates({ user, id: msg?.to?._id });
    } catch (error) {
      console.log(error);
    }
  }, [token, msg, dispatch]);

  return (
    <div
      className={`flex gap-2 bg-white flex-col absolute  z-[50] top-6 ${direction} dark:bg-dark_secondary_bg p-2 rounded-lg`}
    >
      {user?._id === msg?.from?._id && (
        <button
          onClick={() => handleDeleteChatByAll()}
          className="rounded-full flex dark:hover:text-gray-500 transition items-center gap-2 dark:text-white"
        >
          <CiTrash />
          Delete All
        </button>
      )}
      <button
        onClick={() => handleDeleteChatByOneSide()}
        className="rounded-full flex dark:hover:text-gray-500 transition items-center gap-2 dark:text-white"
      >
        <CiTrash />
        Delete
      </button>
    </div>
  );
};
const MessageWrapper = ({ msg, _id, children, onDownload }) => {
  const relativeTime = useRelativeTime(new Date(msg.createdAt));
  const [showOptions, setShowOptions] = useState(false);
  const messageRef = useRef(null);
  const { token, user } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleRealTimeChatUpdates = useCallback(
    ({ user, id }) => {
      if (user) {
        socket.emit("send:chat", { from: user?._id, to: id });
      }
    },
    [user, id, socket]
  );

  const handleClickOutside = useCallback((event) => {
    if (messageRef.current && !messageRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  }, []);

  const handleUpdateReadValue = useCallback(async () => {
    try {
      const res = await apiRequest({
        method: "put",
        url: `${READ_CHAT}/${msg?._id}`,
        token,
      });
      dispatch(fetchChats(token));
      handleRealTimeChatUpdates({ user, id });
      console.log(res.data.message);
    } catch (error) {
      console.error(error);
    }
  }, [msg?._id, token, dispatch, handleRealTimeChatUpdates, user, id]);

  const handleReadChat = useCallback(() => {
    const chatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleUpdateReadValue();
            chatObserver.disconnect();
          }
        });
      },
      { threshold: 1 }
    );

    if (messageRef.current) {
      chatObserver.observe(messageRef.current);
    }

    return () => {
      chatObserver.disconnect();
    };
  }, [handleUpdateReadValue]);

  useEffect(() => {
    if (msg?.to?._id === user?._id && !msg?.isRead) {
      handleReadChat();
    }
  }, [handleReadChat, msg, user]);

  const handleScroll = useCallback(() => {
    setShowOptions(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleClickOutside, handleScroll]);

  return (
    <div
      ref={messageRef}
      className={`flex w-full ${
        msg?.from._id === _id ? "justify-end pl-6" : "justify-start pr-6"
      }`}
    >
      <div
        className={`relative p-2 w-fit rounded-lg flex-col ${
          msg?.from._id === _id ? "bg-main_light_purple" : "bg-white"
        }`}
      >
        <BiDotsHorizontal
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer"
        />
        {children}
        <div className="flex items-center justify-between gap-4 mt-2">
          <p className="text-xs">{relativeTime}</p>
          {msg?.from?._id === user?._id &&
            (msg.isRead ? <IoCheckmarkDoneOutline /> : <IoCheckmarkOutline />)}
        </div>
        {showOptions && (
          <MessageOptions
            msg={msg}
            setShowOptions={setShowOptions}
            direction={msg?.from._id === _id ? "-left-20" : "-right-20"}
          />
        )}
      </div>
    </div>
  );
};

const TextMessage = ({ msg }) => (
  <p className="whitespace-pre-wrap">{msg.message}</p>
);

const ImageMessage = ({ img, handleDownload }) => (
  <div className="relative">
    <img
      className="md:h-[200px] h-[150px] w-auto rounded-lg"
      src={img}
      alt="Message Attachment"
    />
    <button
      onClick={() => handleDownload(img)}
      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg"
    >
      <CiSaveDown1 />
    </button>
  </div>
);

const VideoMessage = ({ video, handleDownload }) => (
  <div className="relative">
    <video
      src={video}
      className="md:h-[200px] h-[150px] w-auto rounded-lg"
      controls
      autoPlay
      muted
    >
      Your browser does not support the video tag.
    </video>
    <button
      onClick={() => handleDownload(video)}
      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg"
    >
      <CiSaveDown1 />
    </button>
  </div>
);

const AudioMessage = ({ audio, handleDownload }) => (
  <div className="relative">
    <ReactAudioPlayer src={audio} controls className="text-white" />
  </div>
);

const DocsMessage = ({ doc, handleDownload }) => (
  <div className="flex flex-col gap-2 size-24 relative justify-center">
    <div className="flex items-center flex-col justify-center p-2 size-20 bg-blue-500 gap-1 rounded-lg">
      <FiFile className="text-xl" />
    </div>
    <button
      onClick={() => handleDownload(doc)}
      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg"
    >
      <CiSaveDown1 />
    </button>
  </div>
);

function ChatItem({ currentChats, _id }) {
  const lastElementRef = useRef();
  const { getFileType } = useGetFileType();
  const currentChatsRef = useRef([]);

  // Handle Download files
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.replace("/upload/", "/upload/fl_attachment/");
    link.setAttribute("download", true);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    lastElementRef.current.scrollIntoView();
  }, [currentChats]);

  return (
    <div className="gap-2 flex flex-col mt-2 pb-[10vh] px-4 w-full h-[75vh] overflow-y-scroll">
      {currentChats?.map((msg, index) => (
        <MessageWrapper
          ref={currentChatsRef.current[index]}
          msg={msg}
          _id={_id}
          key={index}
          onDownload={() => handleDownload(msg.files[0])}
        >
          {msg.message && <TextMessage msg={msg} />}
          <div className="flex flex-col items-center">
            {msg.files &&
              msg.files.length > 0 &&
              msg.files.map((file, i) => (
                <div
                  key={i}
                  className="mt-2 rounded-xl flex items-center justify-center p-2"
                >
                  {getFileType(file) === "image" && (
                    <ImageMessage handleDownload={handleDownload} img={file} />
                  )}
                  {getFileType(file) === "video" && (
                    <VideoMessage
                      handleDownload={handleDownload}
                      video={file}
                    />
                  )}
                  {getFileType(file) === "audio" && (
                    <AudioMessage
                      handleDownload={handleDownload}
                      audio={file}
                    />
                  )}
                  {getFileType(file) === "raw" && (
                    <DocsMessage handleDownload={handleDownload} doc={file} />
                  )}
                </div>
              ))}
          </div>
        </MessageWrapper>
      ))}
      <div className="h-[20px] w-full" ref={lastElementRef}></div>
    </div>
  );
}

export default ChatItem;

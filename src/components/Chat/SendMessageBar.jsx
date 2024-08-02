import { CgAdd } from "react-icons/cg";
import { CiLocationArrow1 } from "react-icons/ci";
import FileTypeModal from "../Modal/FileTypeModal";
import FileComponent from "../Chat/FileComponent";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../hooks/useSocket";
import useEmoji from "../../hooks/useEmoji";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiRequest from "../../services/apiRequest";
import { fetchChats } from "../../redux/slicers/chat";
import { fetchUser } from "../../redux/slicers/user";
import { SEND_CHATS } from "../../services/api";
import Loader from "../Loaders/Loader";

function SendMessagesBar({ isLoading, setIsLoading }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.user);
  const [selectFileModal, setSelectFileModal] = useState(false);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { EmojiPickerComponent, PickEmojiComponent } = useEmoji({
    showPicker,
    setShowPicker,
    setText,
  });

  const handleRealTimeChatUpdates = useCallback(
    ({ user, id }) => {
      if (user) {
        socket.emit("send:chat", { from: user?._id, to: id });
      }
    },
    [user, id]
  );

  const handleSendMessage = useCallback(async () => {
    const formData = new FormData();
    if (files.length === 0 && text.length === 0) {
      return toast.error("Please enter a message or file");
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    if (text.length > 0) {
      formData.append("message", text);
    }

    formData.append("to", id);
    formData.append("from", user._id);
    try {
      setIsLoading(true);
      const res = await apiRequest({
        method: "post",
        url: SEND_CHATS,
        data: formData,
        token,
      });
      setFiles([]);
      setText("");
      dispatch(fetchChats(token));
      dispatch(fetchUser());
      handleRealTimeChatUpdates({ user, id });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [files, text, id, user?._id, token, dispatch]);

  const handleSelectFileModaClose = useCallback(() => {
    setSelectFileModal(false);
  }, [selectFileModal]);

  const handleSetText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [setText]
  );

  const handleOnEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleSetSelectFileModal = useCallback(() => {
    if (!isLoading) {
      setSelectFileModal(true);
    }
  }, [selectFileModal]);

  return (
    <>
      <div className="flex items-center gap-4 justify-center md:bottom-2 fixed bottom-0 md:absolute w-full p-4">
        <div
          onClick={handleSetSelectFileModal}
          className="bg-main_light_purple text-white cursor-pointer hover:opacity-70 transition p-4 rounded-full text-2xl"
        >
          <CgAdd />
        </div>
        <div className="dark:bg-dark_secondary_bg bg-white rounded-lg p-2 w-3/4">
          <textarea
            onKeyDown={handleOnEnter}
            rows={2}
            cols={50}
            name="message"
            onChange={handleSetText}
            value={text}
            className="resize-none bg-transparent w-full outline-none dark:text-white"
            placeholder="Enter Message"
          ></textarea>
          <PickEmojiComponent />
        </div>
        <button
          className="h-12 w-12"
          disabled={isLoading}
          onClick={handleSendMessage}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <CiLocationArrow1 className="text-3xl dark:text-white" />
          )}
        </button>
        <div className="absolute -top-[80%] left-[20%] flex items-center gap-2">
          {files.map((file, index) => (
            <FileComponent
              key={index}
              file={file}
              index={index}
              isLoading={isLoading}
              setFiles={setFiles}
            />
          ))}
        </div>
      </div>
      <FileTypeModal
        isOpen={selectFileModal}
        onClose={handleSelectFileModaClose}
        setFiles={setFiles}
        files={files}
      />
      <EmojiPickerComponent />
    </>
  );
}

export default SendMessagesBar;

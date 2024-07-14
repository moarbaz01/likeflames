import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import UserMessageItem from "../Chat/UserMessageItem";
import UserItem from "../Others/UserItem";
import BlankProfile from "../../assets/blankProfile.png";
import { fetchChats } from "../../redux/slicers/chat";
import { fetchUser } from "../../redux/slicers/user";
import { DELETE_FULL_CHAT } from "../../services/api";
import apiRequest from "../../services/apiRequest";
import Loader from "../Loaders/Loader";

const HorizontalLine = () => (
  <div className="h-[2px] w-full bg-main_light_purple my-4 rounded-full" />
);

const switchChatsButtonData = [{ name: "All Chats", value: 0 }];

const SwitchChats = ({ handleSelected, selected }) => (
  <div className="flex items-center gap-4">
    {switchChatsButtonData.map((item) => (
      <button
        key={item.value}
        className={` text-white font-[500] p-2 rounded-md ${
          selected === item.value
            ? "bg-main_dark_violet_color"
            : "bg-main_light_purple"
        }`}
        onClick={() => handleSelected(item.value)}
      >
        {item.name}
      </button>
    ))}
  </div>
);

const useChatActions = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const deleteChatApiRequest = async (data) => {
    if (!token) {
      toast.error("You are not logged in");
      return;
    }
    try {
      const res = await apiRequest({
        method: "delete",
        url: DELETE_FULL_CHAT,
        data,
        token,
      });
      dispatch(fetchChats(token));
      dispatch(fetchUser());
      toast.success(res.message);
      return res;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return { deleteChatApiRequest };
};

const MessageSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedChat, setSelectedChat] = useState([]);
  const [selectedChatType, setSelectedChatType] = useState(0);
  const [search, setSearch] = useState("");
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const [searchResult, setSearchResult] = useState([]);
  const searchBarRef = useRef(null);
  const { deleteChatApiRequest } = useChatActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectedChat = (index) => {
    if (isLoading) return;
    setSelectedChat((prevSelectedChat) =>
      prevSelectedChat.includes(index)
        ? prevSelectedChat.filter((item) => item !== index)
        : [...prevSelectedChat, index]
    );
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
    setSelectedChat([]);
  };

  const uniqueChats = useMemo(() => {
    if (!chats || chats.length === 0) return [];
    const chatMap = new Map();
    chats.forEach((chat) => {
      const key = chat.from._id === user?._id ? chat.to._id : chat.from._id;
      if (!chatMap.has(key) || chat.createdAt > chatMap.get(key).createdAt) {
        chatMap.set(key, chat);
      }
    });
    return Array.from(chatMap.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [chats, user?._id]);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      setSearchResult([]);
    } else {
      const result = users.filter(
        (u) =>
          u.name.toLowerCase().includes(value.toLowerCase()) &&
          u._id !== user?._id
      );
      setSearchResult(result);
    }
    setEditMode(false);
  };

  const handleDeleteFullChat = async () => {
    if (selectedChat.length === 0) {
      toast.error("Please select a chat");
      return;
    }
    if (!window.confirm("Are you sure?")) return;

    await Promise.all(
      selectedChat.map(async (index) => {
        const chat = uniqueChats[index];
        await deleteChatApiRequest({
          opponentId:
            chat?.from?._id === user?._id ? chat?.to?._id : chat?.from?._id,
        });
      })
    ).finally(() => {
      setIsLoading(false);
    });
    setSelectedChat([]);
    setEditMode(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="md:text-2xl text-3xl dark:text-white font-[500]">
          Your Chats
        </h1>
        {searchResult.length === 0 && (
          <CiEdit
            onClick={!isLoading && handleEditMode}
            className="text-2xl dark:text-white cursor-pointer hover:text-red-500"
          />
        )}
      </div>

      <div ref={searchBarRef} className="flex items-center w-full my-4 gap-2">
        <input
          type="text"
          name="search"
          className="w-full text-text_black border-2 dark:bg-dark_secondary_bg dark:text-white border-main_light_purple rounded-md focus:outline-main_dark_violet_color p-2"
          placeholder="Search"
          onChange={!isLoading && handleChangeSearch}
          value={search}
        />
      </div>

      <HorizontalLine />
      <SwitchChats
        handleSelected={!isLoading && setSelectedChatType}
        selected={selectedChatType}
      />
      {editMode && (
        <div className="flex animate-slideDown items-center gap-2 w-full mb-2 px-2 justify-between">
          <p className="dark:text-white">{selectedChat.length} Selected</p>
          <div>
            <button
              onClick={!isLoading && handleDeleteFullChat}
              className="h-10 px-2 bg-red-500 mr-2 text-white rounded-lg"
            >
              {isLoading ? <Loader /> : "Delete"}
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-4 w-full">
        {searchResult.length > 0
          ? searchResult.map((user, index) => (
              <UserItem
                key={index}
                profilePicture={user.profilePicture || BlankProfile}
                name={user.name}
                username={user.username}
                userId={user._id}
                type={"chat"}
              />
            ))
          : uniqueChats.map((chat, index) => (
              <UserMessageItem
                key={index}
                onClick={() => handleSelectedChat(index)}
                mode={editMode}
                avatar={
                  chat.from._id === user?._id
                    ? chat.to.profilePicture
                    : chat.from.profilePicture
                }
                name={
                  chat.from._id === user?._id ? chat.to.name : chat.from.name
                }
                userId={
                  chat.from._id === user?._id ? chat.to._id : chat.from._id
                }
                lastMsg={chat.message}
                time={chat.createdAt}
                selected={selectedChat.includes(index)}
              />
            ))}
      </div>
    </>
  );
};

export default MessageSection;

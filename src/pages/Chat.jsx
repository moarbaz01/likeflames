import { useNavigate } from "react-router-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdCall, MdVideocam } from "react-icons/md";
import ChatItem from "../components/Chat/ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChats } from "../redux/slicers/chat";
import useRelativeTime from "../hooks/useRelativeTime";
import SendMessagesBar from "../components/Chat/SendMessageBar";
import MessageSection from "../components/Chat/MessageSection";
import BlankProfile from "../assets/blankProfile.png";
import { PeerContext } from "../context/usePeer";
import { BiLeftArrowAlt } from "react-icons/bi";
import useSocket from "../hooks/useSocket";

const RightTopSection = ({ typingStatus, status, currentUser }) => {
  const time = useRelativeTime(new Date(currentUser?.lastSeen));
  const navigate = useNavigate();
  const { id } = useParams();
  const peerContext = useContext(PeerContext);

  return (
    <div className="flex w-full z-20 md:static fixed top-0  justify-between dark:shadow-md py-2 px-4 dark:bg-dark_secondary_bg bg-white">
      <div className="flex items-center gap-2">
        <BiLeftArrowAlt
          onClick={() => navigate("/messages")}
          className="dark:text-white cursor-pointer md:hidden text-3xl"
        />
        <img
          src={currentUser?.profilePicture || BlankProfile}
          className="h-10 object-cover aspect-square w-10 rounded-full"
          alt="Avatar"
        />
        <div className="flex flex-col">
          <p className="dark:text-gray-300 text-lg">
            {currentUser?.name || "Select Chat"}
          </p>
          {currentUser &&
            (typingStatus?.isTyping && typingStatus?.from === id ? (
              <p className="dark:text-gray-300 text-sm">Typing...</p>
            ) : (
              <>
                {status === "Online..." && (
                  <p className="dark:text-gray-300 text-sm">{status}</p>
                )}
                {status !== "Online..." && (
                  <p className="dark:text-gray-400 text-sm">Last seen {time}</p>
                )}
              </>
            ))}
        </div>
      </div>

      {currentUser?.name && (
        <div className="flex items-center dark:text-white text-2xl gap-4">
          {/* <MdCall className=" cursor-pointer hover:opacity-80 transition" /> */}
          <MdVideocam
            className=" cursor-pointer hover:opacity-80 transition"
            onClick={() => peerContext?.createOffer(id)}
          />
        </div>
      )}
    </div>
  );
};

function Chat() {
  const { user, token } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const { chats } = useSelector((state) => state.chat);
  const { connectedUsers } = useSelector((state) => state.connectedUsers);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useSocket();
  const [typingStatus, setTypingStatus] = useState({
    from: null,
    isTyping: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchChats(token));
    }
  }, [id, dispatch, token]);

  // Find Current User
  const currentUser = useMemo(
    () => users?.find((item) => item?._id === id),
    [users, id]
  );

  // User status
  useEffect(() => {
    if (connectedUsers[id]) {
      setStatus("Online...");
    } else {
      setStatus("Offline...");
    }
  }, [connectedUsers, id]);

  const handleTypingStatusReset = useCallback(() => {
    setTypingStatus({ from: null, isTyping: false });
  }, []);

  useEffect(() => {
    socket.on("receive:typing", ({ from }) => {
      setTypingStatus({ from, isTyping: true });
      const timeout = setTimeout(handleTypingStatusReset, 3000); // Adjust time as needed
      return () => clearTimeout(timeout);
    });
  }, [socket, handleTypingStatusReset]);

  const currentChats = useMemo(() => {
    if (!chats || chats.length === 0) {
      return [];
    }

    return chats.filter(
      (item) =>
        (item.from._id === user?._id && item.to._id === id) ||
        (item.from._id === id && item.to._id === user?._id)
    );
  }, [id, chats, user]);

  return (
    <div className="md:h-full ">
      <div className="flex md:min-h-screen">
        <div
          className={`lg:w-[30%] md:w-[50%] hidden md:block px-2  overflow-x-hidden md:px-4 border-r-2 border-gray-600 py-2 `}
        >
          <MessageSection />
        </div>
        {/* Right Chat Section */}
        <div
          className={`lg:w-[70%]  md:w-[50%] pt-16 md:pt-0 md:pb-0 pb-24 w-full md:bg-violet-200 relative md:dark:bg-dark_main_bg`}
        >
          <RightTopSection
            typingStatus={typingStatus}
            status={status}
            currentUser={currentUser}
          />
          {currentChats.length > 0 ? (
            <ChatItem currentChats={currentChats} _id={user._id} />
          ) : (
            <div className="p-4 dark:text-gray-400">No chats available.</div>
          )}
          <SendMessagesBar
            currentUser={currentUser}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;

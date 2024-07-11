import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useMemo, useState } from "react";
import { MdCall, MdVideocam } from "react-icons/md";
import ChatItem from "../components/ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChats } from "../redux/slicers/chat";
import useSocket from "../hooks/useSocket";
import useRelativeTime from "../hooks/useRelativeTime";
import SendMessagesBar from "../components/Chat/SendMessageBar";
import MessageSection from "../components/Chat/MessageSection";
import BlankProfile from "../assets/blankProfile.png";
import { PeerContext } from "../context/usePeer";
import { BiLeftArrowAlt } from "react-icons/bi";

const RightTopSection = ({ status, lastSeen, currentUser }) => {
  const time = useRelativeTime(new Date(lastSeen));
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    createOffer,
  } = useContext(PeerContext);

  return (
    <div className="flex w-full justify-between dark:shadow-md py-2 px-4 dark:bg-dark_secondary_bg bg-white">
      <div className="flex items-center gap-2">
        <BiLeftArrowAlt onClick={() => navigate("/messages")} className="dark:text-white cursor-pointer md:hidden text-3xl" />
        <img
          src={currentUser?.profilePicture || BlankProfile}
          className="h-10 w-10 rounded-full"
          alt="Avatar"
        />
        <div className="flex flex-col">
          <p className="dark:text-gray-300 text-lg">
            {currentUser?.name || "Select Chat"}
          </p>
          {status === "Online..." && (
            <p className="dark:text-gray-300 text-sm">{status}</p>
          )}
          {status !== "Online..." && (
            <p className="dark:text-gray-400 text-sm">Last seen {time}</p>
          )}
        </div>
      </div>

      <div className="flex items-center dark:text-white text-2xl gap-4">
        <MdCall className=" cursor-pointer hover:opacity-80 transition" />
        <MdVideocam className=" cursor-pointer hover:opacity-80 transition" onClick={() => createOffer(id)} />
      </div>
    </div>
  );
};

function Chat() {
  const { user, token } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const { chats, error } = useSelector((state) => state.chat);
  const { connectedUsers, usersLastSeen } = useSelector(
    (state) => state.connectedUsers
  );
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const [lastSeen, setLastSeen] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (usersLastSeen[id]) {
      setLastSeen(usersLastSeen[id]);
    } else {
      setLastSeen(null);
    }
  }, [usersLastSeen, id]);

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
    <div className="h-full">
      <div className="flex min-h-screen">
        <div className={`lg:w-[30%] md:w-[50%] hidden md:block px-2  overflow-x-hidden md:px-4 border-r-2 border-gray-600 py-2 `}>
          <MessageSection />
        </div>
        {/* Right Chat Section */}
        <div className={`lg:w-[70%] md:w-[50%] w-full bg-violet-200 relative dark:bg-dark_main_bg`}>
          <RightTopSection
            status={status}
            lastSeen={lastSeen}
            currentUser={currentUser}
          />
          {currentChats.length > 0 ? (
            <ChatItem currentChats={currentChats} _id={user._id} />
          ) : (
            <div className="p-4 dark:text-gray-400">No chats available.</div>
          )}
          <SendMessagesBar isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
}

export default Chat;

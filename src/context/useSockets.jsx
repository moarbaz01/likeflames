import { createContext, useCallback, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slicers/user";
import {
  setConnectedUsers,
  setUserLastSeen,
} from "../redux/slicers/connectedUsers";
import { fetchChats } from "../redux/slicers/chat";

export const SocketsContext = createContext();

export const SocketsContextProvider = ({ children }) => {
  const { socket } = useSocket();
  const dispatch = useDispatch();

  // Notification sockets
  const sendNotificationHandler = useCallback(
    ({ from, to }) => {
      socket.emit("send:notification", { from, to });
    },
    [socket]
  );

  // Receive events
  useEffect(() => {
    if (socket) {
      // Get Sockets
      socket.on("get:sockets", (users) => {
        dispatch(setConnectedUsers(users));
      });

      // Get notification
      socket.on("receive:notification", () => {
        dispatch(fetchUser());
      });

      // Receive chat
      socket.on("receive:chat", () => {
        dispatch(fetchChats());
        console.log("Hello");
      });

      // Cleanup
      return () => {
        socket.off("get:sockets");
        socket.off("receive:chat");
        socket.off("receive:notification");
      };
    }
  }, [socket, dispatch]);

  const value = {
    sendNotificationHandler,
  };

  return (
    <SocketsContext.Provider value={value}>{children}</SocketsContext.Provider>
  );
};

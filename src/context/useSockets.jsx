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

  const handleGetSockets = useCallback(
    (users) => {
      dispatch(setConnectedUsers(users));
    },
    [dispatch]
  );

  const handleReceieveNotification = useCallback(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleReceiveChat = useCallback(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // Receive events
  useEffect(() => {
    if (socket) {
      // Get Sockets
      socket.on("get:sockets", handleGetSockets);

      // Get notification
      socket.on("receive:notification", handleReceieveNotification);

      // Receive chat
      socket.on("receive:chat", handleReceiveChat);

      // Cleanup
      return () => {
        socket.off("get:sockets", handleGetSockets);
        socket.off("receive:notification", handleReceieveNotification);
        socket.off("receive:chat", handleReceiveChat);
      };
    }
  }, [socket, handleGetSockets, handleReceieveNotification, handleReceiveChat]);

  const value = {
    sendNotificationHandler,
  };

  return (
    <SocketsContext.Provider value={value}>{children}</SocketsContext.Provider>
  );
};

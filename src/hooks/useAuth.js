import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/slicers/user";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchComments } from "../redux/slicers/comments";
import { fetchPosts } from "../redux/slicers/post";
import { fetchUsers } from "../redux/slicers/users";
import { fetchChats } from "../redux/slicers/chat";
import useSocket from "./useSocket";

function useAuth() {
  const { user, token } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const dispatch = useDispatch();

  // Auto login handler
  const autoLoginHandler = useCallback(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Join connectedUsers
  useEffect(() => {
    if (!user) return;
    socket.emit("register", user?._id);

    return () => {
      socket.off("register");
    };
  }, [user, socket]);

  // Fetch Chats
  useEffect(() => {
    if (!user || !token) return;
    dispatch(fetchChats(token));
  }, [user, token, dispatch]);

  // Auto Login
  useEffect(() => {
    autoLoginHandler();
  }, []);

  // Initial data set
  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  return { autoLoginHandler };
}

export default useAuth;

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../slicers/user";
import { postSlice } from "../slicers/post";
import { commentSlice } from "../slicers/comments";
import { chatSlice } from "../slicers/chat";
import { connectedUsers } from "../slicers/connectedUsers";
import { usersSlice } from "../slicers/users";
import { profileUserSlice } from "../slicers/profileUser";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    chat: chatSlice.reducer,
    connectedUsers: connectedUsers.reducer,
    users: usersSlice.reducer,
    profileUser: profileUserSlice.reducer,
  },
});

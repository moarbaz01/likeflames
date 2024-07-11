import { createSlice } from "@reduxjs/toolkit";

export const connectedUsers = createSlice({
  name: "connectedUsers",
  initialState: {
    connectedUsers: {},
    usersLastSeen: {},
  },
  reducers: {
    setConnectedUsers: (state, action) => {
      state.connectedUsers = action.payload;
    },
    setUserLastSeen: (state, action) => {
      state.usersLastSeen = action.payload;
    },
  },
});

export const { setConnectedUsers, setUserLastSeen } = connectedUsers.actions;

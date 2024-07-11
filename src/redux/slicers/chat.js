import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_CHATS } from "../../services/api";
import apiRequest from "../../services/apiRequest";

export const fetchChats = createAsyncThunk("chats", async () => {
  const token = localStorage.getItem("likeflame-token");
  const res = await apiRequest({
    method: "get",
    url: USER_CHATS,
    token,
  });
  return res.data.chats;
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchChats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

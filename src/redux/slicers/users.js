import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_ALL_USERS } from "../../services/api";
import apiRequest from "../../services/apiRequest";

export const fetchUsers = createAsyncThunk("Fetch Users", async () => {
  const res = await apiRequest({
    method: "get",
    url: FETCH_ALL_USERS,
  });
  return res.data.users;
});

export const usersSlice = createSlice({
  name: "Users",
  initialState: {
    users: [],
    isLoading: false,
    error : null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

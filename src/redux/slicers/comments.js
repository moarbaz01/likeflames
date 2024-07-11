import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_COMMMENT } from "../../services/api";
import apiRequest from "../../services/apiRequest";

export const fetchComments = createAsyncThunk("fetch comments", async () => {
  const res = await apiRequest({
    method: "get",
    url: FETCH_COMMMENT,
  });

  return res.data.comments;
});

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_COMMMENT, LIKE_ON_COMMENT } from "../../services/api";
import apiRequest from "../../services/apiRequest";

export const fetchComments = createAsyncThunk("fetch comments", async () => {
  const res = await apiRequest({
    method: "get",
    url: FETCH_COMMMENT,
  });

  return res.data.comments;
});

export const likeOnCommentApi = createAsyncThunk(
  "like/comment",
  async ({ _id }, thunkAPI) => {
    const token = localStorage.getItem('likeflame-token')
    try {
      const res = await apiRequest({
        method: "put",
        url: `${LIKE_ON_COMMENT}/${_id}`,
        token,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    likeOnComment: (state, action) => {
      const { userId, commentId } = action.payload;
      const comment = state.comments.find(
        (comment) => comment._id === commentId
      );
      if (comment) {
        if (comment.likes.includes(userId)) {
          comment.likes = comment.likes.filter((l) => l !== userId);
        } else {
          comment.likes = [...comment.likes, userId];
        }
      }
    },
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

export const { likeOnComment } = commentSlice.actions;

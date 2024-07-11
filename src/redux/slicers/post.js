import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../services/apiRequest";
import { FETCH_ALL_POST, LIKE_AND_DISLIKE } from "../../services/api";

export const fetchPosts = createAsyncThunk("fetch posts", async () => {
  const res = await apiRequest({
    method: "get",
    url: FETCH_ALL_POST,
  });
  return res.data.posts;
});

export const likePost = createAsyncThunk("like post", async ({ id }) => {
  const token = localStorage.getItem("likeflame-token");
  const res = await apiRequest({
    method: "put",
    url: `${LIKE_AND_DISLIKE}/${id}`,
    data: { type: "like" },
    token,
  });

  return res.data.post;
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
  },
});

export const { addPost } = postSlice.actions;

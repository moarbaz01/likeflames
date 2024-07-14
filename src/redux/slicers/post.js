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
    updatePostOnLike: (state, action) => {
      const { postId, userId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
      console.log("Post Index : ", postIndex);
      if (postIndex !== -1) {
        const post = state.posts[postIndex];
        if (post.likes.includes(userId)) {
          post.likes = post.likes.filter((id) => id !== userId);
        } else {
          post.likes = [...post.likes, userId];
          console.log("Hello");
        }
        state.posts[postIndex] = post;
      }
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
  },
});

export const { addPost, updatePostOnLike } = postSlice.actions;

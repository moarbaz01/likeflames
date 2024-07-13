import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../services/apiRequest";
import { FETCH_USER } from "../../services/api";

// Fetch Profile User
export const fetchProfileUser = createAsyncThunk(
  "profileUser/fetchProfileUser",
  async ({ userId }, thunkAPI) => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `${FETCH_USER}/${userId}`,
      });
      console.log("User : ", res.data.user.followers);
      return res.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  profileUser: null,
  loading: false,
  error: null,
};

// Profile User Slice
export const profileUserSlice = createSlice({
  name: "profileUser",
  initialState,
  reducers: {
    updateProfileUser: (state, action) => {
      state.profileUser = { ...state.profileUser, ...action.payload };
    },
    likePostProfileUser: (state, action) => {
      const { postId, userId } = action.payload;
      const postIndex = state.profileUser.posts.findIndex(
        (post) => post._id === postId
      );
      console.log("Post Index : ", postIndex);
      if (postIndex !== -1) {
        const post = state.profileUser.posts[postIndex];
        if (post.likes.includes(userId)) {
          post.likes = post.likes.filter((id) => id !== userId);
        } else {
          post.likes = [...post.likes, userId];
          console.log("Hello");
        }
        state.profileUser.posts[postIndex] = post;
      }
    },
    followAndUnfollowUser: (state, action) => {
      const { userId } = action.payload;
      const isUser = state.profileUser.followers.some(
        (item) => item === userId
      );
      if (isUser) {
        state.profileUser.followers = state.profileUser.followers.filter(
          (item) => item !== userId
        );
      } else {
        state.profileUser.followers = [...state.profileUser.followers, userId];
      }
    },
    updateNotification: (state, action) => {
      const { userId } = action.payload;
      state.profileUser.notifications = [
        ...state.profileUser.notifications,
        { from: { _id: userId } },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profileUser = action.payload;
      })
      .addCase(fetchProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  },
});

export const {
  updateProfileUser,
  likePostProfileUser,
  followAndUnfollowUser,
  updateNotification,
} = profileUserSlice.actions;

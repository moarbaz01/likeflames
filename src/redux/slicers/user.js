import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../services/apiRequest";
import { FETCH_USER, LOGIN, UPDATE_INFORMATION } from "../../services/api";

// Thunks
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("likeflame-token");
    try {
      const response = await apiRequest({
        method: "get",
        url: FETCH_USER,
        token,
      });
      return response.data.user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized: Token may be expired or invalid");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isUser: false,
    error: null,
    isLoading: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.token = action.payload.accessToken;
      state.isUser = true;
      localStorage.setItem("likeflame-token", action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isUser = false;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem("likeflame-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.token = action.payload.accessToken;
        state.isUser = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../services/apiRequest";
import { FETCH_USER, LOGIN, UPDATE_INFORMATION } from "../../services/api";

export const fetchUser = createAsyncThunk(
  "fetch user",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("likeflame-token");
      console.log(token);
      const response = await apiRequest({
        method: "get",
        url: FETCH_USER,
        token,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "Update User",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState.user.token;
      const res = await apiRequest({
        method: "put",
        url: UPDATE_INFORMATION,
        token,
        data,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest({
        method: "post",
        url: LOGIN,
        data,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isUser: false,
    isError: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.isUser = true;
      state.isError = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isUser = false;
      state.isError = null;
      localStorage.removeItem("likeflame-token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.isUser = true;
      state.isError = false;
      localStorage.setItem("likeflame-token", action.payload.accessToken);
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.user = null;
      state.token = null;
      state.isUser = false;
      state.isError = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.isUser = true;
      state.isError = false;
      localStorage.setItem("likeflame-token", action.payload.accessToken);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.token = null;
      state.isUser = false;
      state.isError = action.payload;
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

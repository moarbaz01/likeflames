import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../services/apiRequest";
import { CHECK_SERVER } from "../../services/api";

export const checkServer = createAsyncThunk("checkServer", async () => {
  const response = await apiRequest({
    method: "GET",
    url: CHECK_SERVER,
  });
  return response; // Ensure the response is returned
});

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkServer.pending, (state) => {
        state.isLoading = true; // Set loading to true when the request is pending
      })
      .addCase(checkServer.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false when the request is fulfilled
        // You can also use the action.payload if needed
        console.log(action.payload);
      })
      .addCase(checkServer.rejected, (state) => {
        state.isLoading = false; // Set loading to false when the request fails
      });
  },
});

export default loadingSlice.reducer;

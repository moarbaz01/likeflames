import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slicers/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

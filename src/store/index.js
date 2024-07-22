import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});

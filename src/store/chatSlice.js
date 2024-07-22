import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    type: undefined,
    data: undefined,
    message: [],
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    close: (state) => {
      state.type = undefined;
      state.data = undefined;
      state.message = [];
    },
  },
});

export const { setType, setData, setMessage, close } = chatSlice.actions;
export default chatSlice.reducer;

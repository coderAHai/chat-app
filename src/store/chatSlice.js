import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    type: null,
    data: null,
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
    setClose: (state) => {
      state.type = null;
      state.data = null;
      state.message = [];
    },
  },
});

export const { setType, setData, setMessage, setClose } = chatSlice.actions;
export default chatSlice.reducer;

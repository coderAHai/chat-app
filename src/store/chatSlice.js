import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    type: null,
    data: null,
    message: [],
    chatContacts: [],
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
    setChatContacts: (state, action) => {
      state.chatContacts = action.payload;
    },
    setClose: (state) => {
      state.type = null;
      state.data = null;
      state.message = [];
    },
    addMessage: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.message = [
        ...state.message,
        {
          ...data,
          recipient:
            state.type === "channel" ? data.recipient : data.recipient._id,
          sender: state.type === "channel" ? data.sender : data.sender._id,
        },
      ];
    },
  },
});

export const {
  setType,
  setData,
  setMessage,
  setClose,
  addMessage,
  setChatContacts,
} = chatSlice.actions;
export default chatSlice.reducer;

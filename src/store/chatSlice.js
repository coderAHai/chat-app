import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    type: null,
    data: null,
    message: [],
    chatContacts: [],
    channels: [],
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
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setClose: (state) => {
      state.type = null;
      state.data = null;
      state.message = [];
    },
    addChannels: (state, action) => {
      state.channels.push(action.payload);
    },
    addContacts: (state, action) => {
      state.chatContacts.push(action.payload);
    },
    addMessage: (state, action) => {
      const data = action.payload;
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
  setChannels,
  addChannels,
  addContacts,
} = chatSlice.actions;
export default chatSlice.reducer;

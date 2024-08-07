import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setData } = userSlice.actions;
export default userSlice.reducer;

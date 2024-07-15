import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userName: "Alejandro Pereira",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUserName } = userSlice.actions;

export default userSlice.reducer;

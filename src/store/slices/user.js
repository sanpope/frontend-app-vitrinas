import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userName: null,
    
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUser: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setToken, setUserName, setUser } = userSlice.actions;

export default userSlice.reducer;

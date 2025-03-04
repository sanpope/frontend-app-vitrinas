import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isDeskMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isDeskMenuOpen = !state.isDeskMenuOpen;
    },
    closeMenu: (state) => {
      state.isDeskMenuOpen = false;
    },
    openMenu: (state) => {
      state.isDeskMenuOpen = true;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu, setVitrinaActive } =
  menuSlice.actions;

export default menuSlice.reducer;

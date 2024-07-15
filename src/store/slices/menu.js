import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isDeskMenuOpen: true,
    active: 0,
    vitrinaActive: 0,
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
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setVitrinaActive: (state, action) => {
      state.vitrinaActive = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleMenu, closeMenu, openMenu, setActive, setVitrinaActive } =
  menuSlice.actions;

export default menuSlice.reducer;

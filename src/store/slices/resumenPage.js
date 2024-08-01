import { createSlice } from "@reduxjs/toolkit";

export const resumenPageSlice = createSlice({
  name: "resumenPage",
  initialState: {
    DatosUltimasVentas: null,
  },
  reducers: {
    setDatosUltimasVentas: (state, action) => {
      state.DatosUltimasVentas = action.payload;
    },
  },
});

export const { setDatosUltimasVentas } = resumenPageSlice.actions;

export default resumenPageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const vitrinaSlice = createSlice({
  name: "homePage",
  initialState: {
    name: null,
    city: null,
    ciudadesVitrinas: {},
  },
  reducers: {
    setCiudadesVitrinas: (state, action) => {
      state.ciudadesVitrinas = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDispositivo: (state, action) => {
      state.dispositivo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCiudadesVitrinas, setCity, setName, setDispositivo } =
  vitrinaSlice.actions;

export default vitrinaSlice.reducer;

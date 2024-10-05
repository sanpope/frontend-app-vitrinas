import { createSlice } from "@reduxjs/toolkit";

export const vitrinaSlice = createSlice({
  name: "homePage",
  initialState: {
    name: "Selecciona una Vitrina",
    city: null,
    ciudadesVitrinas: {},
    mensajesVitrina: [],
    mensajesNoLeidos: null,
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
    setMensajesVitrina: (state, action) => {
      state.mensajesVitrina = action.payload;
    },
    setMensajesNoLeidos: (state, action) => {
      state.mensajesNoLeidos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCiudadesVitrinas,
  setCity,
  setName,
  setDispositivo,
  setMensajesVitrina,
  setMensajesNoLeidos,
} = vitrinaSlice.actions;

export default vitrinaSlice.reducer;

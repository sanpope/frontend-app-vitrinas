import { createSlice } from "@reduxjs/toolkit";

export const vitrinaSlice = createSlice({
  name: "homePage",
  initialState: {
    listaDeVitrinas: null,
    city: null,
    name: null,
    inactividad: null,
    venta: {
      fecha: null,
      valor: null,
      productos: [],
    },
    ventaDia: {
      cantidad: null,
      porcentaje: null,
    },
    ventaMesActual: {
      valor: null,
      porcentaje: null,
    },
    ventaDeMes: {
      mes: null,
      valor: null,
    },
    ventaDeDias: {
      dia: null,
      valor: null,
    },
    categoriaProducto: {
      nombre: null,
      porcentajeVentas: null,
    },
    dispositivo: null,
  },
  reducers: {
    setListaDeVitrinas: (state, action) => {
      state.listaDeVitrinas = action.payload;
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
export const { setListaDeVitrinas, setCity, setName, setDispositivo } =
  vitrinaSlice.actions;

export default vitrinaSlice.reducer;

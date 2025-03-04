import { createSlice } from "@reduxjs/toolkit";

export const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    ventaTotalMes: null,
    ventaUltimosMeses: null,
    vitrinasConMasVtasDelMes: null,
    vitrinasConMasVtas: null,
    TopCategoriasGlobal: null,
    productosPopulares: null,
    despachosActuales: null,
    visitasNoVerificadas: null,
    dispositivosFallidos: null,
  },
  reducers: {
    setVentaTotalMes: (state, action) => {
      state.ventaTotalMes = action.payload;
    },
    setTopCategoriasGlobal: (state, action) => {
      state.TopCategoriasGlobal = action.payload;
    },
  },
});


export const { setVentaTotalMes, setTopCategoriasGlobal } =
  homePageSlice.actions;

export default homePageSlice.reducer;

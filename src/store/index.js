import { configureStore } from "@reduxjs/toolkit";
import vitrinaReducer from "./slices/vitrina";
import userReducer from "./slices/user";
import menuReducer from "./slices/menu";
import homePageReducer from "./slices/homePage";
import resumenPageReducer from "./slices/resumenPage";

export default configureStore({
  reducer: {
    vitrinaReducer,
    userReducer,
    menuReducer,
    homePageReducer,
    resumenPageReducer,
  },
});

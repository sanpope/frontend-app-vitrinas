import { configureStore } from "@reduxjs/toolkit";
import vitrinaReducer from "./slices/vitrina";
import userReducer from "./slices/user";
import menuReducer from "./slices/menu";

export default configureStore({
  reducer: {
    vitrinaReducer,
    userReducer,
    menuReducer,
  },
});

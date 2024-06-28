import { configureStore } from "@reduxjs/toolkit";
import vitrinaReducer from "./slices/vitrina";
import userReducer from "./slices/user";

export default configureStore({
  reducer: {
    vitrinaReducer,
    userReducer,
  },
});

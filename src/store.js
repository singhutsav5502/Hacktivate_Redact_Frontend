import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import themeReducer from "./slice/themeSlice"

const store = configureStore({
  reducer: {
    auth: authReducer, 
    theme: themeReducer,
  },
});

export default store;
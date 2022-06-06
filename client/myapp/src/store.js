import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import userRegisterSlice from "./slices/userRegisterSlice";

const store = configureStore({
  reducer: {
    login: userLoginSlice,
    register: userRegisterSlice,
  },
});

export default store;

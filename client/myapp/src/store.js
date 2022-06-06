import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducers: {
    userInfo: userInfoSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import userRegisterSlice from "./slices/userRegisterSlice";
import productsSlics from "./slices/productsSlics";
import productDetailSlice from "./slices/productDetailSlice";
import userProfileSlice from "./slices/userProfileSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    login: userLoginSlice,
    register: userRegisterSlice,
    products: productsSlics,
    productDetail: productDetailSlice,
    cart: cartSlice,
    profile: userProfileSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import userRegisterSlice from "./slices/userRegisterSlice";
import productsSlics from "./slices/productsSlics";
import productDetailSlice from "./slices/productDetailSlice";
import userProfileSlice from "./slices/userProfileSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import orderDetailSlice from "./slices/orderDetailSlice";
import allProductSlice from "./slices/admin/allProductSlice";

const store = configureStore({
  reducer: {
    login: userLoginSlice,
    register: userRegisterSlice,
    products: productsSlics,
    productDetail: productDetailSlice,
    cart: cartSlice,
    profile: userProfileSlice,
    order: orderSlice,
    orderDetail: orderDetailSlice,
    allSellerProduct: allProductSlice,
  },
});

export default store;

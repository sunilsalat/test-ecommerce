import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const placeOrder = createAsyncThunk();

const orderSlice = createSlice({
  name: "order",
  initialState: {
    paymentMethod: "",
    shippingAddressId: "",
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddressId = action.payload;
    },
  },
  extraReducers: {},
});

export const { setPaymentMethod, setShippingAddress } = orderSlice.actions;
export default orderSlice.reducer;

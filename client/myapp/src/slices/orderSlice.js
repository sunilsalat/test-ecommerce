import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({}, { rejectWithValue, getState }) => {
    try {
      const { cartItems, address } = getState.cartItems;
      const { paymentMethod } = getState.order;

      const res = await fetch("/api/v1/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, paymentMethod, address }),
      });
    } catch (error) {}
  }
);

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

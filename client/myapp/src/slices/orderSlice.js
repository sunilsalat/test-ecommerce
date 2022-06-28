import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { flushCart } from "../slices/cartSlice";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({}, { dispatch, rejectWithValue, getState }) => {
    try {
      const { paymentMethod } = getState().order;
      const { cartItems, address } = getState().cart;

      //
      const res = await fetch(`/api/v1/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, address, paymentMethod }),
      });

      if (res.status === 200) {
        dispatch(flushCart({}));
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    paymentMethod: "stripe",
    shippingAddressId: "",
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: {},
});

export const { setPaymentMethod } = orderSlice.actions;
export default orderSlice.reducer;

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

export const updateOrderPaidAt = createAsyncThunk(
  "order/updateOrderPaidAt",
  async (payInt, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/order/updateOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payInt }),
      });

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// all ordres for seller to fulfill
export const getAllOrdersOfSeller = createAsyncThunk(
  "order/getAllOrdersOfSeller",
  async () => {
    try {
      const res = await fetch(`/api/v1/order/get-all-seller-order`);

      return await res.json();
    } catch (error) {}
  }
);

// all ordres for user
export const getAllOrderOfUser = createAsyncThunk(
  "ordre/getAllOrderOfUser",
  async () => {
    try {
      const res = await fetch(`/api/v1/order/get-all-user-order`);
      return await res.json();
    } catch (error) {}
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    paymentMethod: "stripe",
    orderId: null,
    allSellersOrder: null,
    allUserOrder: null,
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    emptyOrderId: (state, action) => {
      state.orderId = null;
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      console.log("Promise pending");
    },
    [placeOrder.fulfilled]: (state, action) => {
      console.log("Promise fulfilled");
      state.orderId = action.payload.id;
    },
    [placeOrder.rejected]: (state, error) => {
      console.log("Promise Rejected");
    },
    [getAllOrdersOfSeller.pending]: (state) => {
      console.log("Promise pending");
    },
    [getAllOrdersOfSeller.fulfilled]: (state, action) => {
      console.log("Promise fulfilled");
      state.allSellersOrder = action.payload.orders;
    },
    [getAllOrdersOfSeller.rejected]: (state, error) => {
      console.log("Promise Rejected");
    },
    [getAllOrderOfUser.pending]: (state) => {
      console.log("Promise pending");
    },
    [getAllOrderOfUser.fulfilled]: (state, action) => {
      console.log("Promise fulfilled");
      state.allUserOrder = action.payload.orders;
    },
    [getAllOrderOfUser.rejected]: (state, error) => {
      console.log("Promise Rejected");
    },
  },
});

export const { setPaymentMethod, emptyOrderId } = orderSlice.actions;
export default orderSlice.reducer;

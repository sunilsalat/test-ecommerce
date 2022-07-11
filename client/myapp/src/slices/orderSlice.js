import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { flushCart } from "../slices/cartSlice";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
<<<<<<< HEAD
  async ({}, { rejectWithValue, getState }) => {
    try {
      const { cartItems, address } = getState.cartItems;
      const { paymentMethod } = getState.order;

      const res = await fetch("/api/v1/order/create", {
=======
  async ({}, { dispatch, rejectWithValue, getState }) => {
    try {
      const { paymentMethod } = getState().order;
      const { cartItems, address } = getState().cart;

      //
      const res = await fetch(`/api/v1/order/create`, {
>>>>>>> e7d70c2871b52ecafd9c4a97b0ba41bde6d8e95b
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        body: JSON.stringify({ cartItems, paymentMethod, address }),
      });
    } catch (error) {}
  }
);
=======
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

// export const createPa
>>>>>>> e7d70c2871b52ecafd9c4a97b0ba41bde6d8e95b

const orderSlice = createSlice({
  name: "order",
  initialState: {
    paymentMethod: "stripe",
    orderId: null,
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
  },
});

export const { setPaymentMethod, emptyOrderId } = orderSlice.actions;
export default orderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleOrderDetail = createAsyncThunk(
  "orderDetail/getSingleOrderDetail",
  async (orderId, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/order/detail/${orderId}`);

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markOrderDeliverd = createAsyncThunk(
  "orderDetail/markOrderDeliverd",
  async (orderId, { dispatch, rejectWithValue }) => {
    try {
      const res = fetch(`/api/v1/order/mark-deliverd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (res.status === 200) {
        dispatch(getSingleOrderDetail(orderId));
      }
    } catch (error) {}
  }
);

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    orderDetail: null,
  },
  reducers: {
    emptyOrderDetail: (state) => {
      state.orderDetail = null;
    },
  },
  extraReducers: {
    [getSingleOrderDetail.pending]: (state) => {
      console.log("promise pending ");
    },
    [getSingleOrderDetail.fulfilled]: (state, action) => {
      console.log("promise fulfilled ");
      state.orderDetail = action.payload.order;
    },
    [getSingleOrderDetail.rejected]: (state, error) => {
      console.log("promise rejected ");
    },
  },
});

export const { emptyOrderDetail } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;

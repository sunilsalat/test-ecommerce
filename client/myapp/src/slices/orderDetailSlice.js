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

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    orderDetail: null,
  },
  reducers: {},
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

export default orderDetailSlice.reducer;

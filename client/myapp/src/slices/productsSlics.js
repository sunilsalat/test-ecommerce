import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const res = await fetch("/api/v1/product/all");
    return await res.json();
  }
);

const productsSlics = createSlice({
  name: "products",
  initialState: { products: [], success: false, error: "" },
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      console.log("Promise pending");
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log("Promise fullfilled");
      console.log(action.payload);
    },
    [getAllProducts.rejected]: (state) => {
      console.log("Promise rejected");
    },
  },
});

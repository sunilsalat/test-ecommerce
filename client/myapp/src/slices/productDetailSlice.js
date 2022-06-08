import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productDetail = createAsyncThunk(
  "ProductDetail/productDetail",
  async ({ id }) => {
    const res = await fetch(`/api/v1/product/detail/${id}`);
    return await res.json();
  }
);

const ProductDetailSlice = createSlice({
  name: "ProductDetail",
  initialState: { product: {} },
  reducers: {},
  extraReducers: {
    [productDetail.pending]: (state) => {
      console.log("Promised pending");
    },
    [productDetail.fulfilled]: (state, action) => {
      console.log("Promised fullfilled");
      state.product = action.payload;
    },
    [productDetail.rejected]: (state) => {
      console.log("Promised rejected");
    },
  },
});

export default ProductDetailSlice.reducer;

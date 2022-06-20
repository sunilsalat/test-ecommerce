import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productDetail = createAsyncThunk(
  "ProductDetail/productDetail",
  async ({ id }) => {
    const res = await fetch(`/api/v1/product/detail/${id}`);
    return await res.json();
  }
);

export const getAllProductReviews = createAsyncThunk(
  "ProductDetail/getAllProductReviews",
  async ({ id }) => {
    const res = await fetch(`/api/v1/review/all/${id}`);
    return await res.json();
  }
);

const ProductDetailSlice = createSlice({
  name: "ProductDetail",
  initialState: { product: {}, reviews:null },
  reducers: {},
  extraReducers: {
    [productDetail.pending]: (state) => {
      console.log("Promised pending");
    },
    [productDetail.fulfilled]: (state, action) => {
      console.log("Promised fullfilled");
      state.product = action.payload.product;
    },
    [productDetail.rejected]: (state, error) => {
      console.log(error.message);
      console.log("Promised rejected");
    },
    // all product reviews
    [getAllProductReviews.pending]: (state, action) => {
      console.log("Promise pending ");
    },
    [getAllProductReviews.fulfilled]: (state, action) => {
      console.log("Promise fullfilled ");
      state.reviews = action.payload.reviews
    },
    [getAllProductReviews.rejected]: (state, action) => {
      console.log("Promise rejected ");
    },
  },
});

export default ProductDetailSlice.reducer;

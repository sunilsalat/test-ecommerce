import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({cat, title}) => {
    try {
      const res = await fetch(`/api/v1/product/all?cat=${cat}&title=${title}`);
      return await res.json();
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategoryWiseProduct",
  async () => {
    const res = await fetch("/api/v1/product/cat-all");
    return await res.json();
  }
);

const productsSlics = createSlice({
  name: "products",
  initialState: { categories: [], products: [], success: false, error: "" },
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      console.log("Promise pending");
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log("Promise fullfilled");
      state.products = action.payload;
      state.success = true;
    },
    [getAllProducts.rejected]: (state, error) => {
      console.log("Promise rejected");
      console.log(error);
    },
    // cat
    [getCategories.pending]: (state) => {
      console.log("Promise pending");
    },
    [getCategories.fulfilled]: (state, action) => {
      console.log("Promise pending");
      state.categories = action.payload.categories;
    },
    [getCategories.rejected]: (state) => {
      console.log("Promise pending");
    },
  },
});

export default productsSlics.reducer;

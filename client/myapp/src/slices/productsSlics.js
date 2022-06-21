import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ query_param }) => {
    const key = query_param && Object.keys(query_param)[0];
    const val = query_param && Object.values(query_param)[0];
    try {
      if (key && val) {
        var res = await fetch(`/api/v1/product/all?${key}=${val}`);
      }else{
         var res = await fetch(`/api/v1/product/all`)
      }
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
  initialState: { categories: null, products: null, success: false, error: "" },
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state) => {},
    [getAllProducts.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.success = true;
    },
    [getAllProducts.rejected]: (state, error) => {
      console.log("Promise rejected");
      console.log(error);
    },
    // cat
    [getCategories.pending]: (state) => {},
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload.categories;
    },
    [getCategories.rejected]: (state) => {
      console.log("Promise rejected");
    },
  },
});

export default productsSlics.reducer;

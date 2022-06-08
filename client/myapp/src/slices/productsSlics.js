import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ cat }) => {
    try {
      const res = await fetch(`/api/v1/product/all?cat=${cat}`);
      return await res.json();
    } catch (error) {
      console.log(error.message, "slkdjfljdslkfjlksdjflkdsjlkfjdslkjflk");
    }
  }
);

export const getCategoryWiseProduct = createAsyncThunk(
  "products/getCategoryWiseProduct",
  async ({ id }) => {
    const res = await fetch(`/api/v1/product/cat-product/${id}`);
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
      state.products = action.payload;
      state.success = true;
    },
    [getAllProducts.rejected]: (state, error) => {
      console.log("Promise rejected");
      console.log(error)
    },
    // cat-wise-product
    [getCategoryWiseProduct.pending]: (state) => {
      console.log("Promise pending");
    },
    [getCategoryWiseProduct.fulfilled]: (state, action) => {
      console.log("Promise pending");
      state.products = action.payload;
    },
    [getCategoryWiseProduct.rejected]: (state) => {
      console.log("Promise pending");
    },
  },
});

export default productsSlics.reducer;

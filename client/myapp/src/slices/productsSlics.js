import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ cat = "", title = "", page = "" }, { dispatch }) => {
    console.log('in get alll products')
    try {
      if (cat || title || page) {
        console.log(page);
        var res = await fetch(
          `/api/v1/product/all?cat=${cat}&title=${title}&page=${page}`
        );
      } else {
        var res = await fetch(`/api/v1/product/all`);
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
  initialState: {
    categories: null,
    products: [],
    currentPage: 0,
    lastPage: 0,
    success: false,
    error: "",
  },
  reducers: {
    emptyProducts: (state, action) => {
      console.log("indise empty prdodfo");
      state.products = [];
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {},
    [getAllProducts.fulfilled]: (state, action) => {
      state.products = [
        ...new Set([...state.products, ...action.payload.products]),
      ];
      state.success = true;
      state.lastPage = action.payload.lastPage;
      state.currentPage = action.payload.currentPage;
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

export const { emptyProducts } = productsSlics.actions;

export default productsSlics.reducer;

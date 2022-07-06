import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllSubCat = createAsyncThunk(
  "seller-allproduct/getAllSubCat",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/product/get-sub-cats/${categoryId}`);

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllSellersProduct = createAsyncThunk(
  "seller-allproduct/getAllSellersProduct",
  async () => {
    try {
      const res = await fetch(`/api/v1/product/product-by-seller`);

      return await res.json();
    } catch (error) {}
  }
);

export const createProduct = createAsyncThunk(
  "seller-allproduct/createProduct",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      // const res = await fetch("/api/v1/product/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      console.log("in carete product slice", data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const allProductSlice = createSlice({
  name: "seller-allproduct",
  initialState: { subCats: null, allSellerProduct: null },
  reducers: {},
  extraReducers: {
    [getAllSubCat.pending]: (state) => {
      console.log("Promise pending");
    },
    [getAllSubCat.fulfilled]: (state, action) => {
      state.subCats = action.payload.allSubCat;
      console.log("Promise fulfilled");
    },
    [getAllSubCat.rejected]: (state) => {
      console.log("Promise rejected");
    },
    [getAllSellersProduct.pending]: (state) => {
      console.log("Promise pending");
    },
    [getAllSellersProduct.fulfilled]: (state, action) => {
      console.log("Promise fulfilled");
      console.log(action.payload);

      state.allSellerProduct = action.payload.products;
    },
    [getAllSellersProduct.rejected]: (state) => {
      console.log("Promise rejected");
    },
  },
});

export default allProductSlice.reducer;

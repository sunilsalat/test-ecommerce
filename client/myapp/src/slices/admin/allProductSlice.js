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

const allProductSlice = createSlice({
  name: "seller-allproduct",
  initialState: { subCats: null },
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
  },
});

export default allProductSlice.reducer;

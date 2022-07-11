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

export const addProductReveiw = createAsyncThunk(
  "ProductDetail/addProductReveiw",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (res.status === 500) {
        throw new Error("Product already reviewed!");
      }

      if (res.status === 200) {
        dispatch(productDetail({ id: data.productId }));
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ProductDetailSlice = createSlice({
  name: "ProductDetail",
  initialState: {
    product: {},
    reviews: null,
    error: null,
    loading: false,
    reveiwLoading: false,
  },
  reducers: {
    emptyProductDetail:(state)=>{
      state.product = {}
      state.reviews = null
    }
  },
  extraReducers: {
    [productDetail.pending]: (state) => {
      console.log("Promised pending");
      state.loading = true;
    },
    [productDetail.fulfilled]: (state, action) => {
      console.log("Promised fullfilled");
      state.product = action.payload.product;
      state.loading = false;
      state.error = null;
    },
    [productDetail.rejected]: (state, error) => {
      console.log(error.message);
      console.log("Promised rejected");
    },
    // all product reviews
    [getAllProductReviews.pending]: (state, action) => {
      console.log("Promise pending ");
      state.reveiwLoading = true
    },
    [getAllProductReviews.fulfilled]: (state, action) => {
      console.log("Promise fullfilled ");
      state.reviews = action.payload.reviews;
      state.error = null;
      state.reveiwLoading = false
    },
    [getAllProductReviews.rejected]: (state, action) => {
      console.log("Promise rejected ");
    },
    // add product review
    [addProductReveiw.pending]: (state) => {},
    [addProductReveiw.fulfilled]: (state) => {
      state.error = null;
    },
    [addProductReveiw.rejected]: (state, error) => {
      state.error = error.payload.message;
    },
  },
});

export const {emptyProductDetail} = ProductDetailSlice.actions
export default ProductDetailSlice.reducer;
 
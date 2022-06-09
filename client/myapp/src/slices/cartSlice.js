import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ item_qty, productId }) => {
    const res = await fetch(`/api/v1/cart/add/${productId}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_qty,
      }),
    });

    return await res.json();
  }
);

export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",
  async () => {
    console.log("in cart slice getall cart ityems");
    const res = await fetch(`/api/v1/cart/all`);
    return await res.json();
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId) => {
    const res = await fetch(`/api/v1/cart/remove/${cartItemId}`, {
      method: "delete",
    });
    return await res.json();
  }
);

export const editCartItem = createAsyncThunk(
  "cart/editCartItem",
  async ({cartItemId, method}) => {
    console.log(cartItemId, method)
    const res = await fetch(`/api/v1/cart/edit/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method,
      }),
    });
    return await res.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQty: 0,
    totalPrice: 0,
  },
  reducers: {},
  extraReducers: {
    [addToCart.pending]: (state) => {
      console.log("promise pendign");
    },
    [addToCart.fulfilled]: (state, action) => {
      console.log("promise pendign");
      console.log(action.payload);
    },
    [addToCart.rejected]: (state, error) => {
      console.log(error.message);
      console.log("promise pendign");
    },
    // get all cart items
    [getAllCartItems.pending]: (state) => {
      console.log("promise pendign");
    },
    [getAllCartItems.fulfilled]: (state, action) => {
      console.log("promise pendign");
      console.log(action.payload);
      state.cartItems = action.payload.cartItems;
      state.totalQty = action.payload.totalQty;
      state.totalPrice = action.payload.totalPrice;
    },
    [getAllCartItems.rejected]: (state, error) => {
      console.log(error.message);
      console.log("promise pendign");
    },
  },
});

export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ item_qty, productId }, { dispatch }) => {
    const res = await fetch(`/api/v1/cart/add/${productId}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_qty,
      }),
    });

    if (res.status === 200) {
      dispatch(getAllCartItems());
    }

    return await res.json();
  }
);

export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",

  async () => {
    const res = await fetch(`/api/v1/cart/all`);
    return await res.json();
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { dispatch }) => {
    const res = await fetch(`/api/v1/cart/remove/${productId}`, {
      method: "delete",
    });

    if (res.status === 200) {
      dispatch(getAllCartItems());
    }
    return await res.json();
  }
);

export const editCartItem = createAsyncThunk(
  "cart/editCartItem",
  async ({ productId, method }, { dispatch, getState }) => {
    const res = await fetch(`/api/v1/cart/edit/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method,
      }),
    });

    if (res.status === 200) {
      dispatch(getAllCartItems());
    }
    return await res.json();
  }
);

export const addCartAddress = createAsyncThunk(
  "cart/addCartAddress",
  async ({ add }, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`/api/v1/cart/add-shi-add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ add }),
      });

      if (res.status === 200) {
        dispatch(getAllCartItems());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const flushCart = createAsyncThunk(
  "cart/flushCart",
  async ({}, { dispatch }) => {
    const res = await fetch(`/api/v1/cart/clear`, {
      method: "DELETE",
    });
  }
);

/*
// hit utli api to clculate shipping fee
export const TotalShippingFee = createAsyncThunk(
  "cart/TotalShippingFee",
  async ({ cartItems, add }) => {
    const res = await fetch(`/api/v1/util/get-shippingfee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        add,
      }),
    });

    return await res.json();
  }
);
*/

const cartAddress = localStorage.getItem("cartAddress")
  ? JSON.parse(localStorage.getItem("cartAddress"))
  : null;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: null,
    totalQty: 0,
    totalPrice: 0,
    totalShippingFee: 0,
    address: cartAddress,
    success: null,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;

      // TODO - improve below logic
      localStorage.removeItem("cartAddress");
      localStorage.setItem("cartAddress", JSON.stringify(action.payload));
    },

    incQty: (state, action) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          item.item_qty += 1;
        }
        return item;
      });

      state.cartItems = newCartItems;
    },

    decQty: (state, action) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          if (item.item_qty > 1) {
            item.item_qty -= 1;
          }
        }
        return item;
      });

      state.cartItems = newCartItems;
    },

    clearCart: (state, action) => {
      state.cartItems = null;
      state.address = null;
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: {
    // get all cart items
    [getAllCartItems.pending]: (state) => {},
    [getAllCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalQty = action.payload.totalQty;
      state.totalPrice = action.payload.totalPrice;
      state.totalShippingFee = action.payload.totalShippingFee;
      state.address =
        action.payload.shippingAddress ||
        JSON.parse(localStorage.getItem("cartAddress"));
    },
    [getAllCartItems.rejected]: (state, error) => {
      console.log(error.message);
      console.log("promise rejected");
    },
    // add item to cart
    [addToCart.pending]: (state) => {},
    [addToCart.fulfilled]: (state, action) => {},
    [addToCart.rejected]: (state, error) => {
      console.log("promise rejected");
    },

    // alter cart item qty
    [editCartItem.pending]: (state) => {},
    [editCartItem.fulfilled]: (state, action) => {},
    [editCartItem.rejected]: (state, error) => {
      console.log(error);
      console.log("promise rejectred");
    },
    // flushcart
    [flushCart.pending]: (state) => {},
    [flushCart.fulfilled]: (state, action) => {
      state.cartItems = null;
      state.totalQty = null;
      state.totalPrice = null;
      state.totalShippingFee = null;
    },
    [flushCart.rejected]: (state) => {},
  },
});

export const { setAddress, decQty, incQty, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

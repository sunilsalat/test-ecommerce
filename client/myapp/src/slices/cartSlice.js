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
  async (cartItemId, { dispatch }) => {
    const res = await fetch(`/api/v1/cart/remove/${cartItemId}`, {
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
  async ({ cartItemId, method }, { dispatch }) => {
    const res = await fetch(`/api/v1/cart/edit/${cartItemId}`, {
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

const userInfo =
  localStorage.getItem("userInfo") &&
  JSON.parse(localStorage.getItem("userInfo"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: null,
    totalQty: 0,
    totalPrice: 0,
    totalShippingFee: 0,
    address: userInfo && userInfo.address.find((add) => add.isDefault === true),
    success: null,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = userInfo.address.find(
        (add) => add._id === action.payload
      );
    },

    incQty: (state, action) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.item_qty += 1;
        }
        return item;
      });

      state.cartItems = newCartItems;
    },

    decQty: (state, action) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.item_qty -= 1;
        }
        return item;
      });

      state.cartItems = newCartItems;
    },

    clearCart: (state, action) => {
      state.cartItems = null;
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
    // get shipping fee on add change and on initial cart load
    [TotalShippingFee.pending]: (state) => {},
    [TotalShippingFee.fulfilled]: (state, action) => {},
    [TotalShippingFee.rejected]: (state, error) => {
      console.log("promise rejcted");
    },
    // alter cart item qty
    [editCartItem.pending]: (state) => {},
    [editCartItem.fulfilled]: (state, action) => {},
    [editCartItem.rejected]: (state, error) => {
      console.log(error);
      console.log("promise rejectred");
    },
  },
});

export const { setAddress, decQty, incQty, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

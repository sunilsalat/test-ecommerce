import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, emptyUserInfo } from "./userProfileSlice";
import { clearCart, getAllCartItems } from "./cartSlice";

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        dispatch(getUserProfile({}));
      } else {
        dispatch(userLogout());
      }

      if (res.status !== 200) {
        throw new Error("LogIn failed");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "login/userLogout",
  async ({}, { dispatch }) => {
    // Clear the local storage and clear userProfile info
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartAddress");
    dispatch(emptyUserInfo());

    const res = await fetch("/api/v1/auth/logout", {
      method: "DELETE",
    });

    if (res.status === 200) {
      dispatch(clearCart());
    }

    return await res.json();
  }
);

const userLoginSlice = createSlice({
  name: "login",
  initialState: { msg: null },
  reducers: {
    defaultAdd: (state, action) => {
      state.userInfo.address = action.payload;
    },
  },
  extraReducers: {
    // Login
    [userLogin.pending]: (state) => {
      console.log("Request pending");
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log("request fulfilled");
    },
    [userLogin.rejected]: (state, error) => {
      console.log("Request rejected");
      state.success = false;
      state.error = error.payload.message;
    },
    // Logout
    [userLogout.pending]: (state) => {
      console.log("Request pending");
    },
    [userLogout.fulfilled]: (state, action) => {
      console.log("Request fullfilled");
      state.msg = true;
    },
    [userLogout.rejected]: (state) => {
      console.log("Request rejected");
    },
  },
});

export const { defaultAdd } = userLoginSlice.actions;

export default userLoginSlice.reducer;

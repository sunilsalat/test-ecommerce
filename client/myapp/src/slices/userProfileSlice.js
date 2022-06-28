import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddress } from "./cartSlice";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async ({}, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch("/api/v1/profile/get-user-info");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addUserAddress = createAsyncThunk(
  "profile/addUserAddress",
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch("/api/v1/profile/add-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      const { add } = await res.json();

      if (res.status === 200) {
        dispatch(setAddress({ ...add }));
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.address.unshift({ ...add });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

const userProfileSlice = createSlice({
  name: "profile",
  initialState: { userInfo: userInfoFromLocalStorage, error: null },
  reducers: {
    emptyUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: {
    // getUserProfileInfo
    [getUserProfile.pending]: (state) => {
      console.log("promise pending");
    },
    [getUserProfile.fulfilled]: (state, action) => {
      console.log("promise fulfilled");
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const defaultAddress =
        action.payload.address.find((e) => e.isDefault === true) || null;

      localStorage.setItem("cartAddress", JSON.stringify(defaultAddress));
      state.userInfo = action.payload;
    },
    [getUserProfile.rejected]: (state, error) => {
      console.log("promise rejected");
    },
    // addUserAddress
    [addUserAddress.pending]: (state) => {},
    [addUserAddress.fulfilled]: (state) => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    [addUserAddress.rejected]: (state, error) => {
      console.log("promise rejected");
    },
  },
});
export const { emptyUserInfo } = userProfileSlice.actions;
export default userProfileSlice.reducer;

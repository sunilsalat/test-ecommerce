import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { defaultAdd } from "./userLoginSlice";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async ({}, { rejectWithValue }) => {
    console.log("inside values  of fget user sprofoi");
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

      if (res.status === 200) {
        const userValues = JSON.parse(localStorage.getItem("userInfo"));
        userValues.address.unshift({...data, isDefault:true});
        localStorage.setItem("userInfo", JSON.stringify(userValues));
      }

      return await res.json();
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
    // getUserProfileInformation
    [getUserProfile.pending]: (state) => {
      console.log("promise pending");
    },
    [getUserProfile.fulfilled]: (state, action) => {
      console.log("promise fulfilled");
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },
    [getUserProfile.rejected]: (state, error) => {
      console.log("promise rejected");
    },
    // addUserAddress
    [addUserAddress.pending]: (state) => {},
    [addUserAddress.fulfilled]: (state) => {},
    [addUserAddress.rejected]: (state, error) => {
      console.log("promise rejected");
    },
  },
});
export const {emptyUserInfo} = userProfileSlice.actions
export default userProfileSlice.reducer;

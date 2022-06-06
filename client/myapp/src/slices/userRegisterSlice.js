import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "register/userRegister",
  async ({ name, email, password }) => {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return res.json();
  }
);

const userRegisterSlice = createSlice({
  name: "register",
  initialState: { userInfo: {}, success: false, error: "" },
  reducers: {},
  extraReducers: {
    [userRegister.pending]: (state) => {
      console.log("Pending");
    },
    [userRegister.pending]: (state, action) => {
      state.userInfo = action.payload;
      state.success = true;
    },
    [userRegister.pending]: (state) => {
      console.log("Rejected");
    },
  },
});

export default userRegisterSlice.reducer;

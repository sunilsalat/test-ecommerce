import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async ({ email, password }) => {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  }
);

export const userLogout = createAsyncThunk("login/userLogout", async () => {
  const res = await fetch("/api/v1/auth/logout", {
    method: "GET",
  });
  return res.json();
});

const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

const userLoginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: userInfoFromLocalStorage,
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    // Login
    [userLogin.pending]: (state) => {
      console.log("Request pending");
    },
    [userLogin.fulfilled]: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
      state.success = true;
    },
    [userLogin.rejected]: (state) => {
      console.log("Request rejected");
    },
    // Logout
    [userLogout.pending]: (state) => {
      console.log("Request pending");
    },
    [userLogout.fulfilled]: (state, action) => {
      localStorage.removeItem("userInfo");
      console.log("Request fullfilled");
      state.userInfo = "";
    },
    [userLogout.rejected]: (state) => {
      console.log("Request rejected");
    },
  },
});

export default userLoginSlice.reducer;

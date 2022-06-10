import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "register/userRegister",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.status !== 200) {
        throw new Error("Can not register User");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
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
    [userRegister.fulfilled]: (state, action) => {
      console.log("fullfilled");
      state.userInfo = action.payload;
      state.success = true;
      state.error = "";
    },
    [userRegister.rejected]: (state, error) => {
      state.error = error.payload.message;
      state.success = false;
      console.log("Rejected");
    },
  },
});

export default userRegisterSlice.reducer;

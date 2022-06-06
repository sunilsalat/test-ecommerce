import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfoFromServer = createAsyncThunk(
  "userInfo/getUserInfoFromServer",
  () => {
    const res = fetch("http://localhost:5000/api/v1/auth/userInfo");
    return res.json();
  }
);

const userInfoSlice = {
  name: "userInfo",
  initialState: { name: "", role: "", id: "" },
  reducers: {},
  extraReducers: {
    [getUserInfoFromServer.pending]: (state) => {
      console.log("Request pending");
    },
    [getUserInfoFromServer.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [getUserInfoFromServer.rejected]: (state) => {
      console.log("Request rejected");
    },
  },
};

export default userInfoSlice.reducers

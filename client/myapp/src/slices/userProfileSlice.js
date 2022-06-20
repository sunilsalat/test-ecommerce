import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userProfile = createAsyncThunk("profile/userProfile", async () => {
  const res = await fetch("");
});

const userProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

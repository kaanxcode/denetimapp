import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    photo: "",
  },
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    clearPhoto: (state) => {
      state.photo = "";
    },
  },
});

export const { setPhoto, clearPhoto } = cameraSlice.actions;

export default cameraSlice.reducer;

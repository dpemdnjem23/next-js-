"use client";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type Home = {
  isHeader: boolean;
  isModal: boolean;
};
const initialState: Home = {
  isHeader: false,
  isModal: false,
};

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsHeader(state, action:PayloadAction<boolean>) {
      state.isHeader = action.payload;
    },
    setIsModal(state, action:PayloadAction<boolean>) {
      state.isModal = action.payload;
    },
  },
});

export const { setIsHeader, setIsModal } = HomeSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default HomeSlice.reducer;

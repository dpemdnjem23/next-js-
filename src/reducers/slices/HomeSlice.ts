"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Home = {
  isHeader: boolean;
  isFooter: boolean;
  isModal: boolean;
  isIntersection: boolean;
};
const initialState: Home = {
  isHeader: false,
  isFooter: false,
  isModal: false,
  isIntersection: false,
};

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsHeader(state, action: PayloadAction<boolean>) {
      state.isHeader = action.payload;
    },
    setIsModal(state, action: PayloadAction<boolean>) {
      state.isModal = action.payload;
    },

    setIsIntersection(state, action: PayloadAction<boolean>) {
      state.isIntersection = action.payload;
    },
    setIsFooter(state, action: PayloadAction<boolean>) {
      state.isFooter = action.payload;
    },
  },
});

export const { setIsHeader, setIsModal, setIsIntersection, setIsFooter } =
  HomeSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default HomeSlice.reducer;

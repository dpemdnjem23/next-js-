"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Home = {
  image: string;
  cardInfoModal: boolean;
  pointsInfoModal: boolean;
};
const initialState: Home = {
  image: "",
  cardInfoModal: false,
  pointsInfoModal:false
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setIsImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setCardInfoModal(state, action: PayloadAction<boolean>) {
      state.cardInfoModal= action.payload;
    },
    setPointsInfoModal(state, action: PayloadAction<boolean>) {
      state.pointsInfoModal = action.payload;
    },
  },
});

export const { setIsImage ,setCardInfoModal,setPointsInfoModal} = ProductSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default ProductSlice.reducer;

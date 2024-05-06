"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 로컬 스토리지 사용

export type Cart = {
  boxObj: [];
  pageRouterLoading: boolean;
  controlQuantity: [{ id: number; quantity: string }];
};
const initialState: Cart = {
  boxObj: [],
  pageRouterLoading: false,
  controlQuantity: [{ id: 0, quantity: "" }],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setBoxObj(state, action: PayloadAction<[]>) {
      state.boxObj = action.payload;
    },
    setPageRouterLoading(state, action: PayloadAction<boolean>) {
      state.pageRouterLoading = action.payload;
    },
    setControlQuantity(state, action: PayloadAction<[{ id: number; quantity: string }]>) {
      state.controlQuantity = action.payload;
    },
  },
});

export const { setBoxObj, setPageRouterLoading, setControlQuantity } =
  CartSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default CartSlice.reducer;

"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 로컬 스토리지 사용

//시군구
type Order = {
  phoneNumber: string;
  message: string;
  city: string;
  district: string;
  isClicked: boolean;
  roadName: string;
  streetNumber: string;
  pageNum: { 0: number; 1: number };
  address: { zip: string, road: string }
  postModal:boolean
};
const initialState: Order = {
  phoneNumber: "선택",
  message: "",
  city: "시/도",
  district: "시/군/구",
  roadName: "",
  isClicked: false,
  streetNumber: "",
  pageNum: { 0: 1, 1: 1 },
  address: { zip: '', road: '' },
  postModal:false
  
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    setIsClicked(state, action: PayloadAction<boolean>) {
      state.isClicked = action.payload;
    },
    setPageNum(state, action: PayloadAction<number>) {
      state.pageNum = action.payload;
    },
    setStreetNumber(state, action: PayloadAction<string>) {
      state.streetNumber = action.payload;
    },
    setRoadName(state, action: PayloadAction<string>) {
      state.roadName = action.payload;
    },
    setAddress(state, action: PayloadAction<{ zip: string, road: string }>) {
      state.address = action.payload;
    },
    setPostModal(state, action: PayloadAction<boolean>) {
      state.postModal = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setMessage,
  setCity,
  setDistrict,
  setIsClicked,
  setPageNum,
  setStreetNumber,
  setRoadName,
  setAddress,
  setPostModal
} = OrderSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default OrderSlice.reducer;

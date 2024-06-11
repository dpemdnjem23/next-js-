"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 로컬 스토리지 사용

export type PhoneNumber = {
  part1: string;
  part2: string;
  part3: string;
};
//시군구
export type Order = {
  name: string;
  phoneNumber: PhoneNumber;
  message: string;
  city: string;
  district: string;
  isClicked: boolean;
  roadName: string;
  streetNumber: string;
  pageNum: { 0: number; 1: number };
  address: { zip: string; road: string; addressLine: string };
  postModal: boolean;
  point: number;
  paymentMethod:boolean 
};
const initialState: Order = {
  name: "",
  phoneNumber: {
    part1: "선택",
    part2: "",
    part3: "",
  },
  message: "",
  city: "시/도",
  district: "시/군/구",
  roadName: "",
  isClicked: false,
  streetNumber: "",
  pageNum: { 0: 1, 1: 1 },
  address: { zip: "", road: "", addressLine: "" },
  postModal: false,
  point: 0,
  paymentMethod: false,
  
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<PhoneNumber>) {
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
    setAddress(
      state,
      action: PayloadAction<{ zip: string; road: string; addressLine1: string }>
    ) {
      state.address = action.payload;
    },
    setPostModal(state, action: PayloadAction<boolean>) {
      state.postModal = action.payload;
    },
    setPoint(state, action: PayloadAction<number>) {
      state.point = action.payload;
    },

    setPaymentMethod(state, action: PayloadAction<boolean>) {
      state.paymentMethod = action.payload;
    },
  
  },
});

export const {
  setName,
  setPhoneNumber,
  setMessage,
  setCity,
  setDistrict,
  setIsClicked,
  setPageNum,
  setStreetNumber,
  setRoadName,
  setAddress,
  setPostModal,
  setPoint,
  setPaymentMethod
} = OrderSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default OrderSlice.reducer;

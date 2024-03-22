"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 로컬 스토리지 사용

type Home = {
  isLogin: boolean;
  isHeart: [];
  personalHeart: [] | null;

  // isHeart: [{user_id:string, product_id:number,id:number}]
};
const initialState: Home = {
  isLogin: false,
  personalHeart: [],

  isHeart: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      const data: { login: boolean } = { login: action.payload };
      const data2 = JSON.stringify(data);
      localStorage.setItem("userLogin", data2);
    },

    setIsLogout(state) {
      const data: { login: boolean } = { login: false };
      const data2 = JSON.stringify(data);
      localStorage.setItem("userLogin", data2);
      localStorage.removeItem("userLogin");
    },

    setIsHeart(state, action: PayloadAction<[]>) {
      state.isHeart = action.payload;
    },

    setPersonalHeart(state, action: PayloadAction<{}>) {
      state.personalHeart = action.payload;
    },
  },
});

export const { setIsLogin, setIsLogout, setIsHeart, setPersonalHeart } =
  UserSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default UserSlice.reducer;

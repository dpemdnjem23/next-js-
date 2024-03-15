"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 로컬 스토리지 사용

type Home = {
  isLogin: boolean;
};
const initialState: Home = {
  isLogin: false,
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
  },
});

export const { setIsLogin, setIsLogout } = UserSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default UserSlice.reducer;

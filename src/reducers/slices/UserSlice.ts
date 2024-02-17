import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용

type Home = {
  isLogin: boolean;
};
const initialState: Home = {
  isLogin: false,
};

export const persistConfig = {
  key: "userList",
  storage,
  whitelist: ["user"],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsHeader(state, action) {
      state.isHeader = action.payload;
    },
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
  },
});

export const persistor = persistStore(store);

export const { setIsHeader, setIsModal } = UserSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default UserSlice.reducer;

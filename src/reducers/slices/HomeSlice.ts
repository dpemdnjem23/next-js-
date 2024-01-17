import { createSlice } from "@reduxjs/toolkit";

interface Home {
  focus: boolean;
}
const initialState: Home = {
  focus: false,
};

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsFocus(state) {
      state.focus = !state.focus;
    },
  },
});

export const { setIsFocus } = HomeSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default HomeSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: rootReducer,
  // counter: counterReducer,
  // Add other reducers here if needed
});

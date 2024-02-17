"use client";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from "./slices/UserSlice";

// import counterReducer from '../features/counterSlice';


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  // counter: counterReducer,
  // Add other reducers here if needed
});

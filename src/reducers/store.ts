"use client";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import logger from "redux-logger";

import { composeWithDevTools } from '@redux-devtools/extension';

export const store = configureStore({
  reducer: rootReducer,
  devTools:process.env.NODE_ENV !== 'production',
});

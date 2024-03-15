"use client";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import logger from "redux-logger";

export const store = configureStore({
  reducer: rootReducer,
});

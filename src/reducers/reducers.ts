"use client"
import { combineReducers } from "redux";
import HomeReducer from "./slices/HomeSlice";



export const rootReducer = combineReducers({
  home: HomeReducer,
});


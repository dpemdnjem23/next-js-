"use client";
import { combineReducers } from "redux";
import HomeReducer from "./slices/HomeSlice";
import UserReducer from "./slices/UserSlice";
import { persistReducer } from "redux-persist";
import ProductReducer from "./slices/ProductSlice";



export const rootReducer = combineReducers({
  home: HomeReducer,
  user: UserReducer,
  product:ProductReducer
});


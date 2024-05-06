"use client";
import { combineReducers } from "redux";
import HomeReducer from "./slices/HomeSlice";
import UserReducer from "./slices/UserSlice";
import { persistReducer } from "redux-persist";
import ProductReducer from "./slices/ProductSlice";
import CartReducer from "./slices/CartSlice";
import OrderReducer from "./slices/OrderSlice";


export const rootReducer = combineReducers({
  home: HomeReducer,
  user: UserReducer,
  product: ProductReducer,
  order:OrderReducer,
  cart:CartReducer
});


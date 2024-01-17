import { combineReducers } from "redux";
import { HomeReducer } from "./slices/HomeSlice";

const rootReducer = combineReducers({
  home: HomeReducer,
});

export default rootReducer;

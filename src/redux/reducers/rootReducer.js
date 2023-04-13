import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import loadingReducer from "./loadingReducer";
import snackReducer from "./snackReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  snack: snackReducer,
});

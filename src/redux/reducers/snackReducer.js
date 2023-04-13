import { createReducer } from "@reduxjs/toolkit";
import { snackTypes } from "../types";

const initialState = {
  open: false,
  message: "",
  severity: "success",
  timeOut: 6000,
};

const snackReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(snackTypes.SHOW_SNACKBAR, (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;

      if (action.payload.timeOut) {
        state.timeOut = action.payload.timeOut;
      }
    })
    .addCase(snackTypes.HIDE_SNACKBAR, (state, action) => {
      return initialState;
    });
});

export default snackReducer;

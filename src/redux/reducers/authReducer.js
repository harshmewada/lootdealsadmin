import { createReducer } from "@reduxjs/toolkit";
import { authTypes } from "../types";

const initialState = {
  isLogged: false,
  name: "KDTECH",
  email: "kd@tech@gmail.com",
  photoURL: "https://",
  role: "Superadmin",
};

export const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(authTypes.LOGIN_USER, (state, action) => {
      state.isLogged = true;
    })
    .addCase(authTypes.LOGOUT_USER, (state, action) => {
      state.isLogged = false;
    })
);

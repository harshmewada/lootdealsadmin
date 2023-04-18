import { createReducer } from "@reduxjs/toolkit";
import { authTypes } from "../types";

const token = localStorage.getItem("token");
const initialState = {
  isLogged: Boolean(token),
  name: "KDTECH",
  email: "kd@tech@gmail.com",
  photoURL: "https://",
  role: "Superadmin",
};

export const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(authTypes.LOGIN_USER, (state, action) => {
      state.isLogged = true;
      localStorage.setItem("token", action.payload.data.accessToken);
    })
    .addCase(authTypes.LOGOUT_USER, (state, action) => {
      state.isLogged = false;
    })
);

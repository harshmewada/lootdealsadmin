import { createReducer, createSelector } from "@reduxjs/toolkit";
import { loadingTypes } from "../types";

const initialState = [];

const loadingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingTypes.ADD_LOADING, (state, action) => {
      state.push(action.payload);
    })
    .addCase(loadingTypes.REMOVE_LOADING, (state, action) => {
      return state.filter((pro) => pro !== action.payload);
    });
});

export default loadingReducer;

export const loadingSelector = createSelector(
  [
    // Usual first input - extract value from `state`
    (state) => state.loading,
    // Take the second arg, `category`, and forward to the output selector
    (state, category) => category,
  ],
  // Output selector gets (`items, category)` as args
  (items, category) =>
    Array.isArray(category)
      ? items?.some((el) => category.includes(el))
      : items.includes(category)
);

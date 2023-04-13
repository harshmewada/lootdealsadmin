import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { rootReducer } from "./reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiService),
});

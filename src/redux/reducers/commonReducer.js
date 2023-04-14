import { createReducer } from "@reduxjs/toolkit";
import { commonTypes, platformTypes, productTypes } from "../types";

const initialState = {
  imagePreview: {
    open: false,
    src: undefined,
    title: "Image Preview",
  },
  platforms: [],
  products: [],
};

const commonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(commonTypes.OPEN_IMAGE_PREVIEW, (state, action) => {
      state.imagePreview.open = true;
      state.imagePreview.title = action.payload.title;
      state.imagePreview.src = action.payload.src;
    })
    .addCase(commonTypes.CLOSE_IMAGE_PREVIEW, (state, action) => {
      state.imagePreview.open = false;
      state.imagePreview.title = "Image Preview";
      state.imagePreview.src = undefined;
    })
    .addCase(platformTypes.GET_PLATFORMS, (state, action) => {
      state.platforms = action.payload.data;
    })
    .addCase(productTypes.GET_PRODUCTS, (state, action) => {
      state.products = action.payload.data;
    });
});

export default commonReducer;

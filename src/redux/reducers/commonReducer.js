import { createReducer } from "@reduxjs/toolkit";
import {
  categoryTypes,
  commonTypes,
  offerTypes,
  platformTypes,
  productTypes,
  settingTypes,
} from "../types";

const initialState = {
  imagePreview: {
    open: false,
    src: undefined,
    title: "Image Preview",
  },
  platforms: [],
  offers: [],

  categories: [],
  products: [],
  setting: {},
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

    .addCase(offerTypes.GET_OFFERS, (state, action) => {
      state.offers = action.payload.data;
    })
    .addCase(platformTypes.GET_ALL_PLATFORMS, (state, action) => {
      state.platforms = action.payload.data;
    })
    .addCase(categoryTypes.GET_CATEGORYS, (state, action) => {
      state.categories = action.payload.data;
    })
    .addCase(categoryTypes.GET_ALL_CATEGORYS, (state, action) => {
      state.categories = action.payload.data;
    })
    .addCase(productTypes.GET_PRODUCTS, (state, action) => {
      state.products = action.payload.data;
    })
    .addCase(settingTypes.GET_SETTING, (state, action) => {
      state.setting = action.payload.data;
    });
});

export default commonReducer;

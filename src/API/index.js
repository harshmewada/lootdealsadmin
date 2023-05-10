export const userApi = {
  LOGIN: "/auth/login",
};

export const settingApi = {
  UPDATE_SETTING: "/setting",
  GET_SETTING: "/setting",
};

export const platformApi = {
  GET_PLATFORMS: "/platform",
  GET_ALL_PLATFORMS: "/platform/all",

  ADD_PLATFORM: "/platform",
  UPDATE_PLATFORM: "/platform",
  DELETE_PLATFORM: "/platform",
};

export const offerApi = {
  GET_OFFERS: "/offer",
  GET_ALL_OFFERS: "/offer/all",

  ADD_OFFER: "/offer",
  UPDATE_OFFER: "/offer",
  DELETE_OFFER: "/offer",
};

export const productApi = {
  GET_PRODUCTS: "/product",

  GET_AMAZON_PRODUCT: `/product/fromAmazon`,

  GET_ALL_PRODUCTS: "/product/all",

  ADD_PRODUCT: "/product",
  UPDATE_PRODUCT: "/product",
  DELETE_PRODUCT: "/product",
  BATCH_DELETE_PRODUCTS: "/product/batch",
};

export const categoryApi = {
  GET_CATEGORYS: "/category",
  GET_ALL_CATEGORYS: "/category/all",

  ADD_CATEGORY: "/category",
  UPDATE_CATEGORY: "/category",
  DELETE_CATEGORY: "/category",
};

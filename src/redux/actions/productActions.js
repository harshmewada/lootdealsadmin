import { productApi } from "../../API";
import { productTypes, REQUESTMETHOD } from "../types";

export const getProducts = ({ query, callBack }) => {
  return {
    type: productTypes.GET_PRODUCTS,
    request: {
      method: REQUESTMETHOD.GET,
      params: query,

      enableMessages: false,
      url: productApi.GET_PRODUCTS,
      callBack,
    },
  };
};

export const addProduct = ({ data, callBack }) => {
  return {
    type: productTypes.ADD_PRODUCT,
    request: {
      method: REQUESTMETHOD.POST,
      data: data,
      url: productApi.ADD_PRODUCT,
      isFormData: true,
      enableMessages: true,
      successMessage: "Product Added Successfully",
      failMessage: "Failed to add Product",
      callBack,
    },
  };
};

export const editProduct = ({ data, callBack }) => {
  return {
    type: productTypes.UPDATE_PRODUCT,
    request: {
      method: REQUESTMETHOD.PATCH,
      data: data,
      url: productApi.UPDATE_PRODUCT,
      isFormData: true,
      enableMessages: true,
      successMessage: "Product Updated Successfully",
      failMessage: "Failed to update Product",
      callBack,
    },
  };
};

export const deleteProduct = ({ data, callBack }) => {
  return {
    type: productTypes.DELETE_PRODUCT,
    request: {
      method: REQUESTMETHOD.DELETE,
      data: data,
      url: productApi.DELETE_PRODUCT,
      isFormData: false,
      enableMessages: true,
      successMessage: "Product deleted Successfully",
      failMessage: "Failed to delete Product",
      callBack,
    },
  };
};

import { categoryApi } from "../../API";
import { categoryTypes, REQUESTMETHOD } from "../types";

export const getCategorys = ({ query, callBack }) => {
  return {
    type: categoryTypes.GET_CATEGORYS,
    request: {
      method: REQUESTMETHOD.GET,
      params: query,

      enableMessages: false,
      url: categoryApi.GET_CATEGORYS,
      callBack,
    },
  };
};

export const addCategory = ({ data, callBack }) => {
  return {
    type: categoryTypes.ADD_CATEGORY,
    request: {
      method: REQUESTMETHOD.POST,
      data: data,
      url: categoryApi.ADD_CATEGORY,
      isFormData: true,
      enableMessages: true,
      successMessage: "Category Added Successfully",
      failMessage: "Failed to add Category",
      callBack,
    },
  };
};

export const editCategory = ({ data, callBack }) => {
  return {
    type: categoryTypes.UPDATE_CATEGORY,
    request: {
      method: REQUESTMETHOD.PATCH,
      data: data,
      url: categoryApi.UPDATE_CATEGORY,
      isFormData: true,

      enableMessages: true,
      successMessage: "Category Updated Successfully",
      failMessage: "Failed to update Category",
      callBack,
    },
  };
};

export const deleteCategory = ({ data, callBack }) => {
  return {
    type: categoryTypes.DELETE_CATEGORY,
    request: {
      method: REQUESTMETHOD.DELETE,
      data: data,
      url: categoryApi.DELETE_CATEGORY,
      isFormData: false,
      enableMessages: true,
      successMessage: "Category deleted Successfully",
      failMessage: "Failed to delete Category",
      callBack,
    },
  };
};

export const getAllCategories = () => {
  return {
    type: categoryTypes.GET_ALL_CATEGORYS,
    request: {
      method: REQUESTMETHOD.GET,

      enableMessages: false,
      url: categoryApi.GET_ALL_CATEGORYS,
    },
  };
};

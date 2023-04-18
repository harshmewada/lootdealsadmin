import { platformApi } from "../../API";
import { platformTypes, REQUESTMETHOD } from "../types";

export const getPlatforms = ({ query, callBack }) => {
  return {
    type: platformTypes.GET_PLATFORMS,
    request: {
      method: REQUESTMETHOD.GET,
      params: query,

      enableMessages: false,
      url: platformApi.GET_PLATFORMS,
      callBack,
    },
  };
};

export const getAllPlatforms = () => {
  return {
    type: platformTypes.GET_ALL_PLATFORMS,
    request: {
      method: REQUESTMETHOD.GET,

      enableMessages: false,
      url: platformApi.GET_ALL_PLATFORMS,
    },
  };
};

export const addPlatform = ({ data, callBack }) => {
  return {
    type: platformTypes.ADD_PLATFORM,
    request: {
      method: REQUESTMETHOD.POST,
      data: data,
      url: platformApi.ADD_PLATFORM,
      isFormData: true,
      enableMessages: true,
      successMessage: "Platform Added Successfully",
      failMessage: "Failed to add Platform",
      callBack,
    },
  };
};

export const editPlatform = ({ data, callBack }) => {
  return {
    type: platformTypes.UPDATE_PLATFORM,
    request: {
      method: REQUESTMETHOD.PATCH,
      data: data,
      url: platformApi.UPDATE_PLATFORM,
      isFormData: true,
      enableMessages: true,
      successMessage: "Platform Updated Successfully",
      failMessage: "Failed to update Platform",
      callBack,
    },
  };
};

export const deletePlatform = ({ data, callBack }) => {
  return {
    type: platformTypes.DELETE_PLATFORM,
    request: {
      method: REQUESTMETHOD.DELETE,
      data: data,
      url: platformApi.DELETE_PLATFORM,
      isFormData: false,
      enableMessages: true,
      successMessage: "Platform deleted Successfully",
      failMessage: "Failed to delete Platform",
      callBack,
    },
  };
};

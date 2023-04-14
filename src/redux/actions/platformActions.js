import QueryString from "qs";
import { platformApi, userApi } from "../../API";
import { platformTypes, REQUESTMETHOD } from "../types";

export const getPlatforms = ({ query, callBack }) => {
  console.log("getPlatforms", query);
  return {
    type: platformTypes.GET_PLATFORMS,
    request: {
      method: REQUESTMETHOD.GET,
      //   params: QueryString.stringify(query),

      enableMessages: false,
      url: platformApi.GET_PLATFORMS,
      callBack,
    },
  };
};

export const addPlatform = (data, callBack) => {
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

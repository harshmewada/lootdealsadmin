import { settingApi } from "../../API";
import { settingTypes, REQUESTMETHOD } from "../types";

export const getSetting = () => {
  return {
    type: settingTypes.GET_SETTING,
    request: {
      method: REQUESTMETHOD.GET,

      enableMessages: false,
      url: settingApi.GET_SETTING,
    },
  };
};

export const editSettting = ({ data, callBack }) => {
  return {
    type: settingTypes.UPDATE_SETTING,
    request: {
      method: REQUESTMETHOD.POST,
      data: data,
      url: settingApi.UPDATE_SETTING,
      isFormData: true,
      enableMessages: true,
      successMessage: "Setting Updated Successfully",
      failMessage: "Failed to update Setting",
      callBack,
    },
  };
};

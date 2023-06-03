import { appErrorApi, categoryApi } from "../../API";
import { appErrorTypes, categoryTypes, REQUESTMETHOD } from "../types";

export const getAppErrors = ({ query, callBack }) => {
  return {
    type: appErrorTypes.GET_APP_ERRORS,
    request: {
      method: REQUESTMETHOD.GET,
      params: query,

      enableMessages: false,
      url: appErrorApi.GET_APP_ERRORS,
      callBack,
    },
  };
};

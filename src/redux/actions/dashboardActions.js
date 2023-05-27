import { dashboardApi } from "../../API";
import { dashboardTypes, REQUESTMETHOD } from "../types";

export const getDashboard = ({ query = null }) => {
  return {
    type: dashboardTypes.GET_DASHBOARD_DATA,
    request: {
      method: REQUESTMETHOD.GET,
      params: query,

      enableMessages: false,
      url: dashboardApi.GET_DASHBOARD_DATA,
    },
  };
};

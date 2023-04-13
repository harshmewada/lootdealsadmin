import { snackTypes } from "../types";

export const showSnackbar = ({ message, severity, timeOut }) => {
  return {
    type: snackTypes.SHOW_SNACKBAR,
    payload: {
      message,
      severity,
      timeOut,
    },
  };
};

export const hideSnackbar = () => {
  return {
    type: snackTypes.HIDE_SNACKBAR,
  };
};

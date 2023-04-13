import { authTypes } from "../types";

export const loginUser = () => {
  return {
    type: authTypes.LOGIN_USER,
  };
};

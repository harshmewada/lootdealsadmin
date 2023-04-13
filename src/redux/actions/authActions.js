import { userApi } from "../../API";
import { authTypes, REQUESTMETHOD } from "../types";

export const loginUser = ({ email, password }, callBack) => {
  return {
    type: authTypes.LOGIN_USER,
    request: {
      method: REQUESTMETHOD.POST,
      data: {
        email,
        password,
      },
      url: userApi.LOGIN,
      callBack,
      successMessage: "Login Successfull",
      failMessage: "Failed To Login",
    },
  };
};

export const logOutUser = () => {
  return {
    type: authTypes.LOGOUT_USER,
  };
};

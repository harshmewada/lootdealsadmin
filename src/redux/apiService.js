import { loadingTypes } from "./types";
import axios from "axios";
import { showSnackbar } from "./actions/snackActions";
const BASE_URL = import.meta.env.VITE_API_URL;

const CancelToken = axios.CancelToken;
export let axiosCancelToken;

const defaultHeaders = {
  "Content-type": "application/json; charset=UTF-8",
};
const formDataHeaders = {
  "Content-type": "multipart/formdata; charset=UTF-8",
};

export const apiService =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    if (action.request && !action.hideLoading) {
      dispatch({ type: loadingTypes.ADD_LOADING, payload: action.type });
      let {
        method,
        url,
        headers,
        data,
        params,
        callBack,
        errorCallback,
        isFormData,
      } = action.request;
      try {
        const token = localStorage.getItem("token");
        const authHeaders = {
          Authorization: `Bearer ${token}`,
        };

        if (isFormData) {
          const formData = new FormData();
          const newData = Object.entries(data).map(([key, value]) => {
            formData.append(key, value);
          });
          data = formData;
        }

        if (params) {
          Object.keys(params).forEach(
            (key) =>
              (params[key] === undefined || params[key] === "") &&
              delete params[key]
          );
        }

        const response = await axios({
          method,
          url: BASE_URL + url,
          headers: {
            ...defaultHeaders,
            ...headers,
            ...(isFormData && formDataHeaders),
            ...(token && authHeaders),
          },
          data,
          params: params,
          cancelToken: new CancelToken((c) => {
            axiosCancelToken = c;
          }),
        });

        if (Boolean(action?.request?.enableMessages)) {
          dispatch(
            showSnackbar({
              message:
                response?.data?.message || action?.request.successMessage,
              severity: "success",
              timeOut: 6000,
            })
          );
        }

        callBack?.(response);
        dispatch({ type: loadingTypes.REMOVE_LOADING, payload: action.type });
        dispatch({ type: action.type, payload: response.data });
      } catch (error) {
        console.log("error", error);
        if (error.toJSON().message === "Network Error") {
          dispatch(
            showSnackbar({
              message: error.toJSON().message,
              severity: "error",
            })
          );
        } else if (Boolean(action?.request?.enableMessages || true)) {
          dispatch(
            showSnackbar({
              message:
                error?.response?.data?.message || action?.request.failMessage,
              severity: "error",
            })
          );
        }
        dispatch({ type: loadingTypes.REMOVE_LOADING, payload: action.type });
        errorCallback?.(error);
        if (axios.isCancel(error)) {
          return JSON.stringify(error);
        }
      }
      return;
    }

    next(action);
  };
export function cancelApiRequest() {
  // return function (dispatch) {
  if (axiosCancelToken !== undefined) {
    axiosCancelToken();
  }

  return;
  // };
}

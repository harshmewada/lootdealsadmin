import { loadingTypes } from "./types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const CancelToken = axios.CancelToken;
export let axiosCancelToken;

const defaultHeaders = {
  "Content-type": "application/json; charset=UTF-8",
};
export const apiService =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    if (action.request && !action.hideLoading) {
      dispatch({ type: loadingTypes.ADD_LOADING, payload: action.type });
      const { method, url, headers, data, params, callBack } = action.request;
      try {
        // await new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve();
        //   }, 5000);
        // });
        const request = await axios({
          method,
          url: BASE_URL + url,
          headers: {
            ...defaultHeaders,
            ...headers,
          },
          data,
          params,
          cancelToken: new CancelToken((c) => {
            axiosCancelToken = c;
          }),
        });

        callBack?.();
        dispatch({ type: loadingTypes.REMOVE_LOADING, payload: action.type });
        dispatch({ type: action.type, data: request.data });
      } catch (error) {
        dispatch({ type: loadingTypes.REMOVE_LOADING, payload: action.type });

        if (axios.isCancel(error)) {
          console.log("HTTP call ended with cancel");
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

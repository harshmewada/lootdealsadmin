import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { cancelApiRequest } from "../redux/apiService";

export const useCancelApi = () => {
  const { pathname } = useLocation();
  const cancelApiRequestMemo = useMemo(() => {
    return cancelApiRequest;
  }, []);
  useEffect(
    () => () => {
      cancelApiRequestMemo();
    },
    [pathname, cancelApiRequestMemo]
  );
};

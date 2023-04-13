import { useSelector } from "react-redux";
import { loadingSelector } from "../redux/reducers/loadingReducer";

const useLoading = (type) => {
  return useSelector((state) => loadingSelector(state, type));
};
export default useLoading;

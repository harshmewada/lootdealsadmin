import { commonTypes } from "../types";

export const openImagePreview = ({ title, src }) => {
  return {
    type: commonTypes.OPEN_IMAGE_PREVIEW,
    payload: {
      title,
      src,
    },
  };
};

export const closeImagePreview = () => {
  return {
    type: commonTypes.CLOSE_IMAGE_PREVIEW,
  };
};

export const setSelected = (data = []) => {
  return {
    type: commonTypes.SET_SELECTED,
    payload: data,
  };
};

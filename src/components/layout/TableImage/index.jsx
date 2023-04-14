import React from "react";
import { useDispatch } from "react-redux";
import { openImagePreview } from "../../../redux/actions/commonActions";

const TableImage = ({ src }) => {
  const dispatch = useDispatch();
  return (
    <img
      src={`${import.meta.env.VITE_IMAGE_URL}/${src}`}
      alt={`${import.meta.env.VITE_IMAGE_URL}/${src}`}
      style={{ width: 50, height: 50, objectFit: "contain", cursor: "pointer" }}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          openImagePreview({
            title: "Image",
            src: `${import.meta.env.VITE_IMAGE_URL}/${src}`,
          })
        );
      }}
    />
  );
};

export default TableImage;

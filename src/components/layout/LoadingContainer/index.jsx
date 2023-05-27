import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoadingContainer = ({ children, isLoading, width, height }) => {
  return isLoading ? (
    <Box
      sx={{
        width: width || "100%",
        height: height || "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    children
  );
};

export default LoadingContainer;

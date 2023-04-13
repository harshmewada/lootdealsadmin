import React from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { hideSnackbar } from "../../../redux/actions/snackActions";
const Snackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity, timeOut } = useSelector(
    (state) => state.snack
  );

  const handleClose = () => {
    dispatch(hideSnackbar());
  };
  return (
    <MuiSnackbar open={open} autoHideDuration={timeOut} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;

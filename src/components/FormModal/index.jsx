import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import FormCreator from "../FormCreator";
import Iconify from "../layout/iconify";

const FormModal = ({
  title,
  onClose = () => {},
  open,
  onSave,
  mode = "add",
  saveTitle = "Save",
  closeTitle = "Cancel",
  dialogWidth = "xl",
  formFields,
}) => {
  const formRef = React.useRef();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={dialogWidth}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{title.toUpperCase()}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[700],
            }}
          >
            <Iconify icon="eva:close-circle-outline" width={30} />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ width: "100%" }}>
        <FormCreator
          formFields={formFields}
          onSubmit={(values) => {
            alert("Form Submit"), console.log("form submit", values);
          }}
          mode={mode}
          ref={formRef}
        />
      </DialogContent>
      <Divider />

      <DialogActions>
        <Stack direction={"row"} spacing={2}>
          {onClose && (
            <Button variant="outlined" onClick={onClose}>
              {closeTitle}
            </Button>
          )}
          {onSave && (
            <Button variant="contained" onClick={() => formRef.current.click()}>
              {saveTitle}
            </Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;

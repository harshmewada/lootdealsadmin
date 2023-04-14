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
import { FORMMODE } from "../../enums";
import FormCreator from "../FormCreator";
import Iconify from "../layout/iconify";

const FormModal = ({
  title,
  onClose = () => {},
  open,
  onFormSubmit,
  mode = FORMMODE.ADD,
  saveTitle = "Save",
  closeTitle = "Cancel",
  dialogWidth = "xl",
  formFields,
  formData = {},
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
          onSubmit={onFormSubmit}
          mode={mode}
          ref={formRef}
          formData={formData}
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
          {onFormSubmit && (
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

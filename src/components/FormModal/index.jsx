import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
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
import useResponsive from "../../hooks/useResponsive";
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
  isLoading,
  selectOptions,
}) => {
  const formRef = React.useRef();
  const theme = useTheme();
  const isMobile = useResponsive("down", "sm");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={isMobile ? "xl" : dialogWidth}
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
      <DialogContent
        sx={{
          width: isMobile ? "100%" : theme.breakpoints.values[dialogWidth],
          ...(isMobile && { minWidth: "80vw" }),
        }}
      >
        <FormCreator
          formFields={formFields}
          onSubmit={onFormSubmit}
          mode={mode}
          ref={formRef}
          formData={formData}
          isLoading={isLoading}
          selectOptions={selectOptions}
        />
      </DialogContent>
      <Divider />

      <DialogActions
        sx={{ padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}` }}
      >
        <Stack direction={"row"} spacing={2}>
          {onClose && (
            <Button variant="outlined" onClick={onClose}>
              {closeTitle}
            </Button>
          )}
          {onFormSubmit && (
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onClick={() => formRef.current.click()}
            >
              {saveTitle}
            </LoadingButton>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;

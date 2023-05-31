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
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORMMODE } from "../../enums";
import { productTypes } from "../../redux/types";
import FormCreator from "../FormCreator";
import Iconify from "../layout/iconify";
import { loadingSelector } from "../../redux/reducers/loadingReducer";

import { getAmazonProduct } from "../../redux/actions/productActions";
import { showSnackbar } from "../../redux/actions/snackActions";
import { useEffectOnce } from "react-use";

const AmazonProductModal = ({
  title,
  onClose: handleClose,
  open,
  onFormSubmit,
  mode = FORMMODE.ADD,
  saveTitle = "Save",
  closeTitle = "Cancel",
  dialogWidth = "xl",
  formFields,
  defaultFormData = {},
  isLoading,
  selectOptions = {},
}) => {
  const dispatch = useDispatch();
  const formRef = React.useRef();
  const theme = useTheme();
  const isFetchingProduct = useSelector((state) =>
    loadingSelector(state, productTypes.GET_AMAZON_PRODUCT)
  );
  const [productUrl, setProductUrl] = React.useState();
  const [productData, setProductData] = React.useState();
  async function createFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "test.jpg", metadata);

    return file;
    // ... do something with the file or return it
  }
  const getProductInfo = (url) => {
    setProductUrl(url);
    const asin = url.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
    const id = asin ? asin[1] : null;
    if (id === null || !id) {
      dispatch(showSnackbar("Invalid url", "error"));
      return;
    }
    dispatch(
      getAmazonProduct({
        query: { productId: id },
        callBack: async (res) => {
          const imageFile = await createFile(res.data.data.productImage);
          const proData = {
            ...res.data.data,
            productImage: imageFile,
          };
          setProductData(proData);
        },
      })
    );
  };

  const onClose = () => {
    setProductData();
    setProductUrl();
    handleClose();
    // formRef.current.reset();
  };

  const amazonPlatformId = selectOptions?.platformId?.find(
    (el) => el.platformName === "Amazon"
  )?._id;

  useEffect(() => {
    setProductData();
    setProductUrl();
    console.log("setProductData", productData);

    // if (formRef.current) {
    //   formRef.current.reset({});
    // }
  }, [open]);
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
      <DialogContent sx={{ width: theme.breakpoints.values[dialogWidth] }}>
        <TextField
          fullWidth
          label="Enter Url"
          placeholder="Enter Amazon Product Url"
          onChange={({ target: { value } }) => getProductInfo(value)}
          value={productUrl}
        />
      </DialogContent>
      {!isFetchingProduct && productData && (
        <>
          <Divider />
          <DialogContent sx={{ width: theme.breakpoints.values[dialogWidth] }}>
            <FormCreator
              formFields={formFields}
              onSubmit={onFormSubmit}
              mode={mode}
              ref={formRef}
              formData={{
                ...defaultFormData,
                platformId: amazonPlatformId,
                isAutoAdded: true,
                ...productData,
                categoryId: [],
              }}
              isLoading={isLoading}
              selectOptions={selectOptions}
            />
          </DialogContent>
        </>
      )}
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
              loading={isLoading || isFetchingProduct}
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

export default AmazonProductModal;

import { Button, FormHelperText, IconButton } from "@mui/material";
import React, { useRef } from "react";
import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openImagePreview } from "../../../redux/actions/commonActions";
import Iconify from "../../layout/iconify/index";

const ImageInput = ({
  control,
  name,
  label,
  required,
  disabled,
  readOnly,
  placeholder,
  error,
  accept,
  rules = {},
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {
    field: { onChange, value },
  } = useController({
    control: control,
    name,
    rules: {
      required: {
        value: required,
        message: `${label} is required `,
      },
      ...rules,
    },
  });
  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };
  return (
    <>
      <Button
        fullWidth
        color="primary"
        variant="outlined"
        size="large"
        sx={{ height: (theme) => theme.spacing(7) }}
        startIcon={<Iconify icon="eva:cloud-upload-outline" width={20} />}
        endIcon={
          value && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                const isValueUrl = isValidUrl(value);
                dispatch(
                  openImagePreview({
                    title: isValueUrl ? value : value?.name,
                    src: isValueUrl ? value : URL.createObjectURL(value),
                  })
                );
              }}
            >
              <Iconify icon="eva:image-outline" width={20} />
            </IconButton>
          )
        }
        onClick={() => inputRef.current.click()}
      >
        {isValidUrl(value)
          ? value
          : value?.name || `${label}${required && "*"}`}
      </Button>
      {error && <FormHelperText error={true}>{error}</FormHelperText>}
      <input
        type={"file"}
        ref={inputRef}
        accept={accept || ".png, .jpg, .jpeg, .webp"}
        style={{ display: "none" }}
        onChange={(e) => {
          onChange({
            ...e,
            target: {
              ...e.target,
              value: e.target.files[0],
            },
          });
        }}
      />

      {/* <TextField
        label={label}
        placeholder={placeholder}
        fullWidth
        required={required}
        disabled={disabled}
        error={Boolean(error)}
        helperText={error}
        value={value}
        onChange={onChange}
        InputProps={{
          readOnly: readOnly,
        }}
      /> */}
    </>
  );
};

export default ImageInput;

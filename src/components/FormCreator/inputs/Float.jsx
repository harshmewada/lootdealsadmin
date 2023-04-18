import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const Float = ({
  control,
  name,
  label,
  required,
  disabled,
  readOnly,
  placeholder,
  error,
  rules = {},
}) => {
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
  return (
    <TextField
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
      inputMode="decimal"
      inputProps={{}}
    />
  );
};

export default Float;

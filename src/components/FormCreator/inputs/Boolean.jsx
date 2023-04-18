import { FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const TextInput = ({
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
    <FormControlLabel
      sx={{ height: "100%" }}
      fullWidth
      control={
        <Switch
          placeholder={placeholder}
          fullWidth
          required={required}
          disabled={disabled}
          error={Boolean(error)}
          helperText={error}
          checked={value}
          onChange={onChange}
          // InputProps={{
          //   readOnly: readOnly,
          // }}
          readOnly={readOnly}
          color="warning"
        />
      }
      label={label}
    />
  );
};

export default TextInput;

import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const AsyncSelect = ({
  control,
  name,
  label,
  required,
  disabled,
  readOnly,
  placeholder,
  error,
  rules = {},
  options = [],
  optionLabel,
  optionValue,
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
    <Autocomplete
      disablePortal
      id={name}
      options={options}
      getOptionLabel={(el) => el[optionLabel]}
      fullWidth
      readOnly={readOnly}
      disabled={disabled}
      value={value}
      onChange={(e, newValue) => {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: newValue[optionValue],
          },
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          error={Boolean(error)}
          helperText={error}
          fullWidth
        />
      )}
    />
  );
};

export default AsyncSelect;

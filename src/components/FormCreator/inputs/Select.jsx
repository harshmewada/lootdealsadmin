import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const SelectField = ({
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
  multiple,
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
    <FormControl
      fullWidth
      variant="outlined"
      required={required}
      error={Boolean(error)}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth
        onChange={onChange}
        value={value}
        id={name}
        multiple={multiple}
      >
        {options.map((el) => (
          <MenuItem key={el[optionValue]} value={el[optionValue]}>
            {el[optionLabel]}
          </MenuItem>
        ))}
      </Select>{" "}
      {error && <FormHelperText error={true}>{error}</FormHelperText>}
    </FormControl>

    // <Autocomplete
    //   disablePortal
    //   id={name}
    //   options={options}
    //   getOptionLabel={(el) => el[optionLabel]}
    //   fullWidth
    //   readOnly={readOnly}
    //   disabled={disabled}
    //   value={selectedOption}
    //   onChange={(e, newValue) => {
    //     onChange({
    //       ...e,
    //       target: {
    //         ...e.target,
    //         value: newValue[optionValue],
    //       },
    //     });
    //   }}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       label={label}
    //       placeholder={placeholder}
    //       required={required}
    //       disabled={disabled}
    //       error={Boolean(error)}
    //       helperText={error}
    //       fullWidth
    //     />
    //   )}
    // />
  );
};

export default SelectField;

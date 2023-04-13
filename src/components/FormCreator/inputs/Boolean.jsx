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
          value={value}
          onChange={onChange}
          InputProps={{
            readOnly: readOnly,
          }}
          color="warning"
        />
      }
      label={label}
    />
  );
};

export default TextInput;

// import { TextField } from "@mui/material";
// import React from "react";
// import { Controller } from "react-hook-form";

// const TextInput = ({
//   control,
//   name,
//   label,
//   required,
//   disabled,
//   readOnly,
//   placeholder,
//   error,
//   rules = {},
// }) => {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       rules={{
//         required: {
//           value: required,
//           message: `${label} is required `,
//         },
//         ...rules,
//       }}
//       render={({ field }) => {
//         console.log("field", field);
//         return (
//           <TextField
//             {...field}
//             label={label}
//             placeholder={placeholder}
//             fullWidth
//             required={required}
//             disabled={disabled}
//             error={Boolean(error)}
//             helperText={error}
//           />
//         );
//       }}
//     />
//   );
// };

// export default TextInput;

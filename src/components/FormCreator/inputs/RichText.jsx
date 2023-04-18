import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  var EMPTY_DELTA = { ops: [] };
  return (
    <ReactQuill
      value={value}
      theme="snow"
      onChange={(val) => {
        let event = new Event("change");
        let newEvent = {
          ...event,
          target: {
            name: name,
            value: val,
          },
        };
        onChange(newEvent);
      }}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      }}
      formats={[
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ]}
    />
  );
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
    />
  );
};

export default TextInput;

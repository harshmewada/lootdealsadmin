import { useFormControl } from "@mui/material";
import { useEffect } from "react";
import { useFormState, useWatch } from "react-hook-form";

export const useSearchForm = ({
  isSearchForm,
  formRef,
  control,
  formFields,
}) => {
  if (!isSearchForm) {
    return;
  }
  const form = useWatch({ control, name: formFields.map((el) => el.name) });
  useEffect(() => {
    if (form.length > 0) formRef.current.click();
  }, [form]);
};

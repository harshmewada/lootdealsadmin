import { Box } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchForm } from "../../hooks/useSearchForm";
import * as inputs from "./inputs/index";

const fullGridWidth = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
const FormCreator = React.forwardRef(
  (
    {
      formFields,
      selectOptions,
      onSubmit,

      formData = {},
      isLoading,
      isSearchForm = false,
    },
    formRef
  ) => {
    const methods = useForm({
      defaultValues: { ...formData },
    });

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = methods;

    useSearchForm({ isSearchForm: isSearchForm, formRef, control, formFields });
    console.log("form errors", errors);
    return (
      <FormProvider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: fullGridWidth,
              gridGap: (theme) => theme.spacing(2),
              width: "100%",
            }}
          >
            {formFields.map((el) => {
              const Input = inputs[el.type];

              if (!Input) {
                return (
                  <Box key={el.name}>Input of type {el.type} not found</Box>
                );
              }
              return (
                <Box key={el.name} sx={{ gridColumn: `span ${el.width || 4}` }}>
                  <Input
                    {...el}
                    control={control}
                    error={errors?.[el.name]?.message}
                    {...(isLoading && {
                      readOnly: true,
                    })}
                    {...(el.hasExternalOptions && {
                      options: selectOptions[el.name],
                    })}
                  />
                </Box>
              );
            })}
          </Box>
          <input type="submit" style={{ display: "none" }} ref={formRef} />
        </form>
      </FormProvider>
    );
  }
);

export default FormCreator;

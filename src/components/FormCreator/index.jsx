import { Box } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as inputs from "./inputs/index";

const fullGridWidth =
  "auto auto auto auto auto auto auto auto auto auto auto auto";
const FormCreator = React.forwardRef(
  (
    { mode, formData, formFields, selectOptions, onSubmit, onCancel },
    formRef
  ) => {
    const methods = useForm({
      defaultValues: {},
    });

    const {
      control,
      handleSubmit,
      formState: { errors, touchedFields },
    } = methods;
    console.log("form Errors", errors);
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
                return <Box>Input of type {el.type} not found</Box>;
              }
              return (
                <Box sx={{ gridColumn: `span ${el.width || 4}` }}>
                  <Input
                    {...el}
                    control={control}
                    error={errors?.[el.name]?.message}
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

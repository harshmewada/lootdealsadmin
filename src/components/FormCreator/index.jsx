import { Box } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as inputs from "./inputs/index";

const fullGridWidth =
  "auto auto auto auto auto auto auto auto auto auto auto auto";
const FormCreator = React.forwardRef(
  (
    { mode, formFields, selectOptions, onSubmit, onCancel, formData = {} },
    formRef
  ) => {
    const methods = useForm({
      defaultValues: { ...formData },
    });

    const {
      control,
      handleSubmit,
      formState: { errors, touchedFields },
    } = methods;
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

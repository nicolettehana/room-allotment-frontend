import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Field } from "formik";

const SelectField = ({
  name,
  label,
  isRequired = true,
  placeholder,
  children,
  onValueChange, // optional prop
  ...others
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl
          isRequired={isRequired}
          isInvalid={meta.error && meta.touched}
        >
          <FormLabel htmlFor={name} fontSize="sm" mb={1}>{label}</FormLabel>
          <Select
            id={name}
            placeholder={placeholder}
            {...field}
            {...others}
            onChange={(e) => {
              field.onChange(e); // keeps Formik state
              if (onValueChange) onValueChange(e.target.value); // notify parent
            }}
          >
            {children}
          </Select>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default SelectField;

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

const InputComboBox = ({
  name,
  label,
  isRequired = true,
  options,
  ...others
}) => {
  // States
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <FormControl
          isRequired={isRequired}
          isInvalid={meta.error && meta.touched}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup>
            <Input
              type="text"
              // variant="brand"
              id={name}
              {...others}
              {...field}
              onFocus={() => setShowOptions(true)}
            />
            <InputRightElement
              cursor="pointer"
              onClick={() => setShowOptions(true)}
            >
              <MdOutlineExpandMore size={20} />
            </InputRightElement>

            {showOptions && (
              <Stack
                w="full"
                pos="absolute"
                left={0}
                top={10}
                bg="paper"
                zIndex="tooltip"
                opacity={1}
                border="1px"
                borderColor="border"
                spacing={0}
              >
                {options.map((opt) => (
                  <Stack
                    key={opt}
                    cursor="pointer"
                    py={1}
                    px={4}
                    _hover={{ bg: "brand.600", color: "white" }}
                    onClick={() => {
                      form.setFieldValue(name, opt);
                      setShowOptions(false);
                    }}
                  >
                    <Text>{opt}</Text>
                  </Stack>
                ))}
              </Stack>
            )}
          </InputGroup>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputComboBox;

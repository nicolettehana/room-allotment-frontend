import React, { useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Field } from "formik";

const FileUploadField = ({
  name,
  label,
  FILE_TYPES,
  FILE_SIZE,
  isRequired = true,
  ...others
}) => {
  // Hooks
  const fileRef = useRef();

  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={meta.error && meta.touched}
          >
            <Stack spacing={0}>
              <FormLabel htmlFor={name}>{label}</FormLabel>

              <Box
                as="input"
                type="file"
                accept={FILE_TYPES}
                ref={fileRef}
                display="none"
                onChange={(e) => form.setFieldValue(name, e.target.files[0])}
                {...others}
              />

              <Box
                rounded="md"
                p={4}
                border="1px"
                borderColor="border"
                borderStyle="dashed"
                bg="onPaper"
                cursor="pointer"
                onClick={() => fileRef.current.click()}
              >
                {meta.value === undefined || meta.value === "" ? (
                  <VStack>
                    <MdOutlineFileUpload size={32} />
                    <VStack>
                      <Text>Click here to browse file</Text>
                      <VStack spacing={0}>
                        <Text fontSize="small" color="body">
                          Max file size: {(FILE_SIZE / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </Text>
                        <Text fontSize="small" color="body">
                          Supported file formats:
                        </Text>
                        <Text fontSize="small" color="body">
                          {FILE_TYPES.join(", ")}
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                ) : (
                  <Stack>
                    <SimpleGrid
                      columns={{ base: 1, sm: 2 }}
                      gap={{ base: 0, sm: 2 }}
                    >
                      <Text color="body" textAlign="start">
                        File name:
                      </Text>
                      <Text>{meta.value?.name}</Text>
                    </SimpleGrid>
                    <SimpleGrid
                      columns={{ base: 1, sm: 2 }}
                      gap={{ base: 0, sm: 2 }}
                    >
                      <Text color="body" textAlign="start">
                        File size:
                      </Text>
                      <Text>
                        {(meta.value?.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    </SimpleGrid>
                    <SimpleGrid
                      columns={{ base: 1, sm: 2 }}
                      gap={{ base: 0, sm: 2 }}
                    >
                      <Text color="body" textAlign="start">
                        File type:
                      </Text>
                      <Text>{meta.value?.type}</Text>
                    </SimpleGrid>
                  </Stack>
                )}
              </Box>

              <Text fontSize="small" color="red" mt={2}>
                {meta.error}
              </Text>
            </Stack>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FileUploadField;

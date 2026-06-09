import React from "react";
import {
  Button,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdOutlineTaskAlt } from "react-icons/md";

const RegisteredSuccessModal = ({ isOpen, onClose }) => {
  // Routers
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontSize="lg" fontWeight="bold">
            Success
          </ModalHeader>

          <ModalBody as={VStack} spacing={4}>
            <Center bg="green.600" color="white" p={4} rounded="full">
              <Icon as={MdOutlineTaskAlt} boxSize={12} />
            </Center>
            <Stack spacing={0}>
              <Text fontWeight="bold" textAlign="center">
                Registration Successful
              </Text>
              <Text color="body" textAlign="center">
                Your account has been created successfully. You can now log in
                using your credentials.
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter as={HStack}>
            <Button variant="outline" onClick={() => navigate("/")} w="full">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default RegisteredSuccessModal;

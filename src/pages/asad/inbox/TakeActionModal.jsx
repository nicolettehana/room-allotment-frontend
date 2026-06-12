import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import TakeActionForm from "../../../forms/asad/TakeActionForm";

const TakeActionModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold" pt={6}>
          Booking Request
        </ModalHeader>
        <ModalBody>
          {data ? (
            <TakeActionForm onSuccess={onClose} data={data} />
          ) : (
            <Text color="gray.500">No purchase selected</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TakeActionModal;

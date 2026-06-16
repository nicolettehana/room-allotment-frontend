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
import CancelForm from "../../../forms/dept/CancelForm";

const CancelModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold" pt={6} color="brown.800">
          Are you sure you want to cancel?
        </ModalHeader>
        <ModalBody>
          {data ? (
            <CancelForm onSuccess={onClose} data={data} />
          ) : (
            <Text color="gray.500">No Booking selected</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CancelModal;

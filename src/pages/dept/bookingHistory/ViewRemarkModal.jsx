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
  Text
} from "@chakra-ui/react";

const ViewRemarkModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" >
      <ModalOverlay />
      <ModalContent borderRadius="xl" bg="brown.200">
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold" pt={6} >
          Remark by Nazir
        </ModalHeader>
        <ModalBody  pb={6} >
          {data ? (
            <Text>{data}</Text>
            // <TakeActionForm onSuccess={onClose} data={data} />
          ) : (
            <Text color="gray.500">No purchase selected</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewRemarkModal;

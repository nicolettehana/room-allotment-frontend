import React, { useEffect, useState } from "react";
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
  VStack,
} from "@chakra-ui/react";
import { useFetchAllotmentLetter } from "../../hooks/allotmentsQuery";
import PdfViewer from "../core/PDFViewer";
import { MdOutlineArrowBack } from "react-icons/md";

const AllotmentLetterPDFModal = ({ rowState, isOpen, onClose }) => {
  // States
  const [pdfURL, setPdfURL] = useState("");

  // Queries
  const letterQuery = useFetchAllotmentLetter(
    (response) => {
      setPdfURL(window.URL.createObjectURL(response.data));
      return response;
    },
    (error) => {
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description:
          error.response.data.detail ||
          "Oops! something went wrong. Couldn't display allotment letter.",
      });
      return error;
    }
  );

  // Side-Effects
  useEffect(() => {
    letterQuery.mutate({
      appNo: rowState?.appNo,
      letterNo: rowState?.letterNo,
    });
  }, [rowState?.letterNo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay>
        <ModalContent as={VStack}>
          <ModalCloseButton />
          <ModalHeader fontSize="lg" fontWeight="bold" w="full">
            <HStack justifyContent="space-between">
              <Button
                variant="outline"
                leftIcon={<MdOutlineArrowBack />}
                onClick={onClose}
              >
                Back
              </Button>
              <span>Allotment Letter</span>
              <span />
            </HStack>
          </ModalHeader>

          <ModalBody>
            <PdfViewer pdfFile={pdfURL} />
          </ModalBody>
          <ModalFooter as={HStack}>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default AllotmentLetterPDFModal;

import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFetchVisitorPhoto } from "../../../hooks/visitorQueries";

const VisitorPhotoModal = ({ visitorCode, isOpen, onClose }) => {
  const {
    data: blob,
    isLoading,
    error,
  } = useFetchVisitorPhoto(visitorCode);

  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  setPhotoUrl(url);

  return () => URL.revokeObjectURL(url);
}, [blob]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visitor Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          {isLoading && <Spinner />}
          {error && <Text color="red.500">Failed to load photo</Text>}
          {photoUrl && (
            <Image src={photoUrl} alt="Visitor" maxH="400px" mx="auto" />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VisitorPhotoModal;

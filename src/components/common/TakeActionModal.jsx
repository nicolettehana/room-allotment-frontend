import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

const TakeActionModal = ({
  isOpen,
  onClose,
  rowState,
  setActionCode,
  moveToApprovedDisclosure = null,
  forwardDisclosure = null,
  rejectDisclosure = null,
  moveToDifferentWL = null,
  forwardEProposalDisclosure = null,
}) => {
  // Handlers
  const handleActions = (action) => {
    setActionCode(action.actionCode);
    switch (action.actionCode) {
      case 3:
        moveToApprovedDisclosure.onOpen();
        break;
      case 4:
        forwardDisclosure.onOpen();
        break;
      case 6:
        rejectDisclosure.onOpen();
        break;
      case 12:
        moveToDifferentWL.onOpen();
        break;
      case 22:
        forwardEProposalDisclosure.onOpen();
        break;
      default:
        break;
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontSize="lg" fontWeight="bold">
            Actions
          </ModalHeader>
          <ModalBody as={Stack} spacing={2}>
            {rowState?.actions?.map((action) => (
              <Button
                key={action.actionCode}
                variant="outline"
                onClick={() => handleActions(action)}
                disabled={action.actionCode === -1}
              >
                {action.action}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default TakeActionModal;

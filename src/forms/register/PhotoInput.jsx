import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

const PhotoInput = ({ value, onChange }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState(null);

  const [cameraError, setCameraError] = useState(null);
  const [videoReady, setVideoReady] = useState(false);

  const hasCamera = async () => {
    const devices = await navigator?.mediaDevices?.enumerateDevices();
    return devices.some((d) => d.kind === "videoinput");
  };

  /* 🔁 Generate preview when file changes */
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  /* 🎥 Start camera */
  useEffect(() => {
    if (!isOpen) return;

    setCameraError(null);
    setVideoReady(false);

    navigator?.mediaDevices
      ?.getUserMedia({
        video: { facingMode: "environment" },
      })
      .then((stream) => {
        if (!stream.getVideoTracks().length) {
          throw new Error("NO_VIDEO_TRACK");
        }

        const video = videoRef.current;
        streamRef.current = stream;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          if (video.videoWidth === 0) {
            setCameraError("Camera detected but no video feed.");
            return;
          }
          video.play();
          setVideoReady(true);
        };
      })
      .catch((err) => {
        setCameraError("No usable camera available.");
      });

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [isOpen]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "photo.jpg", {
        type: "image/jpeg",
      });
      onChange(file);
      onClose();
    }, "image/jpeg");
  };

  return (
    <HStack spacing={4} align="center">
      {/* 📸 Preview */}
      {preview && (
        <Box
          boxSize="80px"
          border="1px solid"
          borderColor="gray.300"
          rounded="md"
          overflow="hidden"
        >
          <Image
            src={preview}
            alt="Photo preview"
            boxSize="100%"
            objectFit="cover"
          />
        </Box>
      )}

      {/* 📂 Upload */}
      <Button as="label" leftIcon={<FaFileUpload />}>
        Upload
        <input
          hidden
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => onChange(e.target.files[0])}
        />
      </Button>

      {/* 📷 Capture */}
      <Button
        variant="brand"
        onClick={onOpen}
        leftIcon={<FaCamera />}
        isDisabled={!hasCamera}
      >
        Capture
      </Button>

      {/* Camera modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Capture Photo</ModalHeader>
          <ModalBody>
            <Box
              border="1px solid"
              borderColor="gray.200"
              rounded="md"
              overflow="hidden"
            >
              <video
                ref={videoRef}
                muted
                playsInline
                autoPlay
                style={{
                  width: "100%",
                  background: "#000",
                  display: videoReady ? "block" : "none",
                }}
              />

              {cameraError && (
                <Box color="red.500" fontSize="sm">
                  {cameraError}
                </Box>
              )}

              {!videoReady && !cameraError && (
                <Box fontSize="sm" color="gray.500">
                  Starting camera…
                </Box>
              )}
            </Box>
            <canvas ref={canvasRef} hidden />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="brand"
              onClick={capturePhoto}
              isDisabled={!videoReady}
            >
              Capture
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};
export default PhotoInput;

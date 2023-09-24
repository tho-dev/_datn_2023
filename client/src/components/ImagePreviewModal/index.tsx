import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Image, Box } from '@chakra-ui/react';

type Props = {
  imageSrc: string,
  onClose: any,
  isOpen: any,
}

const ImagePreviewModal = ({ imageSrc, onClose, isOpen }: Props) => {
  return (
    <Box >
      <Modal onClose={onClose} isOpen={isOpen} size={"3xl"}>
        <ModalOverlay />
        <ModalContent >
          <ModalCloseButton />
          <ModalBody >
            <Image objectFit={"cover"} src={imageSrc} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>

  );
};

export default ImagePreviewModal;
import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Button,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { TraskIcon } from "~/components/common/Icons";

type Props = {
  isOpen?: boolean;
  onClose?: any;
  icon?: React.ReactNode;
  size?: string;
  title?: string;
  content?: string;
  textBtnA5?: string;
  textBtn70?: string;
  textBtn80?: string;
  handlePrint: (value: any) => void;
};

const ModelPrint = ({
  isOpen = true,
  onClose,
  icon = <TraskIcon size={14} color="bg.red" />,
  size = "lg",
  title = "In vận đơn cho mã đơn hàng",
  content = "Lưu ý: khổ 52 x 70 mm và khổ 80 x 80 mm chỉ dành cho máy in nhiệt, in và dán trực tiếp lên món hàng",
  textBtnA5 = "In khổ A5",
  textBtn70 = "In khổ 52 * 70mm",
  textBtn80 = "In khổ 80 * 80mm",
  handlePrint,
}: Props) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={size}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader></AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody pt="12" pb="0">
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            {icon}
            <Box mt="6">
              <Text fontSize="lg" textAlign="center" fontWeight="bold">
                {title}
              </Text>
              <Text fontSize="md" textAlign="center">
                {content}
              </Text>
            </Box>
          </Flex>
        </AlertDialogBody>
        <AlertDialogFooter justifyContent="center" pt="6" pb="12">
          <Button
            ref={cancelRef as any}
            bgColor="#f3f6f9"
            color="text.black"
            transition="all 0.5s ease"
            _hover={{
              transform: "translateY(-5px)",
              bgColor: "#cfd1d4",
            }}
            onClick={() => handlePrint("printA5")}
          >
            {textBtnA5}
          </Button>
          <Button
            bgColor="#f3f6f9"
            ml={3}
            color="text.black"
            transition="all 0.5s ease"
            _hover={{
              transform: "translateY(-5px)",
              bgColor: "#cfd1d4",
            }}
            onClick={() => handlePrint("print80x80")}
          >
            {textBtn70}
          </Button>
          <Button
            bgColor="#f3f6f9"
            ml={3}
            color="text.black"
            transition="all 0.5s ease"
            _hover={{
              transform: "translateY(-5px)",
              bgColor: "#cfd1d4",
            }}
            onClick={() => handlePrint("print52x70")}
          >
            {textBtn80}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModelPrint;

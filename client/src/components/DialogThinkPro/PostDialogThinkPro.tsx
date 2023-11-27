import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

type Props = {
  size?: any; // kích thước của dialog (mn vào doc size trên document của nó nhé)
  title?: any; // tiêu đề của của dialog
  children?: any; // nội dụng của dialog
  footer?: any; // footer của dialog
  isOpen?: any; // trạng thái đóng mở dialog
  onClose?: any; // đóng dialog
  motionPreset?: any; // style xuất liện của dialog
  isCentered?: any; // căn giữa dialog
  scrollBehavior?: any; // tạo thanh cuộn chuột inside và outside
};

const PostDialogThinkPro = ({
  size = "5xl",
  isOpen,
  onClose,
  title,
  children,
  footer,
  isCentered = false,
  scrollBehavior = "inside",
  motionPreset = "slideInBottom",
}: Props) => {
  const cancelRef = useRef();
  return (
    <AlertDialog
      size={size}
      isOpen={isOpen}
      onClose={onClose}
      isCentered={isCentered}
      motionPreset={motionPreset}
      scrollBehavior={scrollBehavior}
      leastDestructiveRef={cancelRef as any}
    >
      <AlertDialogOverlay bg="#1c1f23bf" />
      <AlertDialogContent rounded="2xl">
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{children}</AlertDialogBody>
        <AlertDialogFooter>{footer}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostDialogThinkPro;

import { Box } from "@chakra-ui/layout";
import Client from "./components/Client";
import { useDisclosure } from "@chakra-ui/react";
import AddComment from "./components/AddComment";

const CommentView = ({ productId }: any) => {
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,

  } = useDisclosure();

  return (
    <>
      <Box my="6">
        <Box
          bg="white"
          w="100%"
          rounded="lg"
          py={{
            sm: "8",
            lg: "8",
          }}
          px={{
            sm: "6",
            md: "6",
            lg: "6",
            xl: "6",
          }}
        >
          {/* <Assess /> */}
          <Client productId={productId} />
          <AddComment productId={productId} onClose={onCloseDialog} />
        </Box>
      </Box>
      
    </>
  );
};

export default CommentView;

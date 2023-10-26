import { Box, Heading, Text } from "@chakra-ui/layout";
import Assess from "./components/Assess";
import Filter from "./components/Filter";
import Client from "./components/Client";
import { Button, useDisclosure } from "@chakra-ui/react";
import DialogThinkPro from "~/components/DialogThinkPro";
import AddComment from "./components/AddComment";

const CommentView = () => {
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
          <Client />
          <AddComment onClose={onCloseDialog} />
        </Box>
      </Box>
    </>
  );
};

export default CommentView;

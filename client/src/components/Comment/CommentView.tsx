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
          borderRadius="2xl"
          py={{
            sm: "1",
            lg: "1",
          }}
          px={{
            sm: "10",
            md: "10",
            lg: "15",
            xl: "15",
          }}
        >
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Khánh hàng đánh giá
          </Text>
          <Assess />
          <Client />
          <AddComment onClose={onCloseDialog} />
        </Box>
      </Box>
    </>
  );
};

export default CommentView;

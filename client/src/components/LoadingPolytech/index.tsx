import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";

const LoadingPolytech = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="100vw"
      h="100vh"
      maxH="full"
      maxW="full"
      alignItems="center"
      justifyContent="center"
      bgColor="bg.white"
      zIndex="999"
      flexDirection={"column"}
      gap={4}
    >
      <Spinner size="xl" color="bg.blue" thickness="4px" />
      <Text fontSize={"18px"} fontWeight="bold">
        Đang Tải ...
      </Text>
    </Flex>
  );
};

export default LoadingPolytech;

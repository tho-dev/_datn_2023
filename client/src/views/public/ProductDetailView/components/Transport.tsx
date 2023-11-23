import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import DialogThinkPro from "~/components/DialogThinkPro";
import { NavArrowRightIcon } from "~/components/common/Icons";

const Transport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Text as={"h5"} fontSize={"lg"} fontWeight={"600"}>
          Vận chuyển
        </Text>
        <Flex
          onClick={onOpen}
          as={"button"}
          fontSize={"14px"}
          bg={"white"}
          alignItems={"center"}
          color={"text.blue"}
        >
          Chọn địa chỉ giao hàng
          <Flex
            w="9"
            h="9"
            right="4"
            top={"calc(50% - 24px)"}
            translateY="-50%"
            zIndex="5"
            rounded="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            className="btn-next"
          >
            <NavArrowRightIcon size={4} strokeWidth={2} color="text.black" />
          </Flex>
        </Flex>

        {/* Modal */}
        <DialogThinkPro
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          title={<Heading fontSize="xl">Chọn Tỉnh / Thành phố</Heading>}
        ></DialogThinkPro>
      </Flex>
    </Box>
  );
};

export default Transport;

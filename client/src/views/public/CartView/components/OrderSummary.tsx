import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";

type Props = {
  handlePayment: () => void;
};

const OrderSummary = ({ handlePayment }: Props) => {
  return (
    <Box>
      <Text as={"h5"} fontSize={"18px"} fontWeight={"600"} lineHeight={"27px"}>
        Tóm tắt đơn hàng
      </Text>
      <Flex
        justifyContent={"space-between"}
        py={"4"}
        borderBottomColor={"border.primary"}
        borderBottomWidth={"1px"}
        borderStyle="dashed"
      >
        <Box as={"p"} fontSize={"12px"} lineHeight={"18px"} fontWeight="medium">
          Giảm giá:
        </Box>
        <Box as={"p"} fontSize={"12px"} lineHeight={"18px"} fontWeight={"600"}>
          9.300.000
        </Box>
      </Flex>
      <Flex justifyContent={"space-between"} py={"4"}>
        <Box as={"p"} fontSize={"12px"} lineHeight={"18px"} fontWeight="medium">
          Tổng cộng:
        </Box>
        <Box as={"p"} fontSize={"lg"} color={"#FE3464"} fontWeight={"semibold"}>
          19.190.000
        </Box>
      </Flex>
      <Button
        w={"full"}
        fontSize={"md"}
        fontWeight={"600"}
        onClick={handlePayment}
      >
        Mua Ngay
      </Button>
    </Box>
  );
};

export default OrderSummary;

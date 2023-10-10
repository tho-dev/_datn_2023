import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";

type Props = {
  data: any;
  handlePayment: () => void;
};

const OrderSummary = ({ handlePayment, data }: Props) => {
  const caculate_discount = (data: any[]) => {
    if (!data) return 0;
    const discount = data.reduce((acc, val) => {
      return acc + (val.price_before_discount - val.price) * val.quantity;
    }, 0);
    return discount;
  };
  console.log(data);

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
          {caculate_discount(data.products).toLocaleString() || 0}
        </Box>
      </Flex>
      <Flex justifyContent={"space-between"} py={"4"}>
        <Box as={"p"} fontSize={"12px"} lineHeight={"18px"} fontWeight="medium">
          Tổng cộng:
        </Box>
        <Box as={"p"} fontSize={"lg"} color={"#FE3464"} fontWeight={"semibold"}>
          {data ? data.total_money.toLocaleString() : 0}
        </Box>
      </Flex>
      <Button
        w={"full"}
        fontSize={"md"}
        fontWeight={"600"}
        onClick={handlePayment}
        _hover={{ bg: "bg.red" }}
        bgColor={data.products.length <= 0 ? "bg.darkGray" : "bg.red"}
      >
        Mua Ngay
      </Button>
    </Box>
  );
};

export default OrderSummary;

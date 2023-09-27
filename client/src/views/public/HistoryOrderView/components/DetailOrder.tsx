import React from "react";
import {
  Box,
  Divider,
  Flex,
  TabPanel,
  Text,
  Tag,
  GridItem,
} from "@chakra-ui/react";
import ItemCart from "./ItemCart";

type Props = {};

const DetailOrder = (props: Props) => {
  return (
    <Box p="4" my={4} rounded="md" backgroundColor="bg.gray">
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight={"bold"}>
          Mã đơn hàng:{" "}
          <Text as={"span"} fontSize="14px">
            #1234567
          </Text>
        </Text>
        <Tag
          fontSize="12px"
          fontWeight="bold"
          textTransform={"uppercase"}
          color={"text.red"}
        >
          pending
        </Tag>
      </Flex>
      <Divider />
      <Box>
        <ItemCart />
        <Flex justifyContent="space-between">
          <Text fontSize="14px" fontWeight="bold">
            Số lượng:{" "}
            <Text
              as={"span"}
              fontSize="14px"
              fontWeight={"bold"}
              color={"text.red"}
            >
              5 * 200đ
            </Text>
          </Text>
          <Text fontSize="14px" fontWeight="bold">
            Thành tiền:{" "}
            <Text
              as={"span"}
              fontSize="14px"
              fontWeight={"bold"}
              color={"text.red"}
            >
              1000 đ
            </Text>
          </Text>
        </Flex>
        <Divider />
      </Box>
      <Box>
        <ItemCart />
        <Flex justifyContent="space-between">
          <Text fontSize="14px" fontWeight="bold">
            Số lượng:{" "}
            <Text
              as={"span"}
              fontSize="14px"
              fontWeight={"bold"}
              color={"text.red"}
            >
              5 * 200đ
            </Text>
          </Text>
          <Text fontSize="14px" fontWeight="bold">
            Thành tiền:{" "}
            <Text
              as={"span"}
              fontSize="14px"
              fontWeight={"bold"}
              color={"text.red"}
            >
              1000 đ
            </Text>
          </Text>
        </Flex>
        <Divider />
      </Box>
      <Box>
        <ItemCart />
        <Flex justifyContent="space-between">
          <Text fontSize="14px" fontWeight="bold">
            Số lượng:{" "}
            <Text
              as={"span"}
              fontSize="14px"
              fontWeight={"bold"}
              color={"text.red"}
            >
              5 * 200đ
            </Text>
          </Text>
          <Text fontSize="14px" fontWeight="bold">
            Thành tiền:{" "}
            <Text
              as={"span"}
              fontSize="14px"
              fontWeight={"bold"}
              color={"text.red"}
            >
              1000 đ
            </Text>
          </Text>
        </Flex>
        <Divider />
      </Box>

      <Box my={4} rounded="md" backgroundColor="bg.gray">
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tống số lượng :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            3 sản phẩm
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tổng tiền sản phẩm :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            3000đ
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tổng tiền giao hàng :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            200đ
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Thuế VAT 10% :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            300đ
          </Text>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tổng tiền cần thanh toán :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            3500đ
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailOrder;

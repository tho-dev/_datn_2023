// import React, { useEffect, useState } from 'react';
import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { formatCurrency } from "~/utils/fc";

type Props = {
  product: any;
};

const ItemCart = ({ product }: Props) => {
  return (
    <>
      <Flex justifyContent={"space-between"} my={"4"}>
        <Flex gap="2" alignItems="center">
          <Box w="56px" h="56px">
            <Image
              src={product?.image?.url}
              alt="name"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box ml={"5"}>
            <Text as={"p"} fontSize={"14px"} fontWeight={"bold"}>
              {product?.name}
            </Text>
            <Box>
              <Text
                as={"p"}
                fontSize={"12px"}
                backgroundColor={"#F6F9FC"}
                my={"2"}
                fontWeight={"semibold"}
              >
                i5 1340P, QHD+ 16GB, 512GB, Mới, Full box, Nhập khẩu
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight="bold">
          Số lượng:{" "}
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            {product?.quantity}
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
            {product?.total_money.toLocaleString()} đ
          </Text>
        </Text>
      </Flex>
    </>
  );
};

export default ItemCart;

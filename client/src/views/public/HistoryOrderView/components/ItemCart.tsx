// import React, { useEffect, useState } from 'react';
import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";

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
            <Flex gap="2" flexWrap="wrap" my={2}>
              {product.option_value?.map((x: any, i: any) => {
                return (
                  <Text
                    key={i}
                    px="3"
                    py="1"
                    fontSize="xs"
                    fontWeight="semibold"
                    rounded="xl"
                    borderWidth="1px"
                    borderColor="#eef1f6"
                    boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
                  >
                    {x}
                  </Text>
                );
              })}
            </Flex>
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

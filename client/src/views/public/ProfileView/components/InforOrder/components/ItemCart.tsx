import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";

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
              src={product?.image.url || ""}
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
                {product?.shared_url}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ItemCart;

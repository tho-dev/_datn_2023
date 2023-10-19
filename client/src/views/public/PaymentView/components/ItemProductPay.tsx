import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import ItemBonus from "./ItemProductBonus";

type Props = {
  product: any;
};

const ItemProductPay = ({ product }: Props) => {
  return (
    <>
      <Flex justifyContent={"space-between"} my={"4"} px={"2"}>
        <Flex>
          <Box>
            <Image
              src={product?.image?.url}
              alt="name"
              w="78px"
              height="68px"
            />
          </Box>
          <Box ml={"5"}>
            <Text as={"p"} fontSize={"14px"}>
              {product?.name}
            </Text>
            <Box>
              <Text
                as={"p"}
                fontSize={"12px"}
                backgroundColor={"#F6F9FC"}
                my={"2"}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                w={"257px"}
              >
                {product.option_value.toString()}
              </Text>
            </Box>
            <Box>
              <Flex alignItems={"center"}>
                <Text
                  as={"p"}
                  fontSize={"md"}
                  color={"text.red"}
                  fontWeight={"semibold"}
                >
                  {product.price.toLocaleString()}
                </Text>
                <Text as={"p"} ml={"8px"} fontSize={"sm"}>
                  x{product.quantity}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
      {/* <ItemBonus /> */}
    </>
  );
};

export default ItemProductPay;

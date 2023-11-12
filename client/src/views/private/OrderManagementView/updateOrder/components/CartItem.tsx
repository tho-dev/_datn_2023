import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import ItemBonus from "./ItemBonus";
import { CloseIcon, MinusIcon, PlusIcon } from "~/components/common/Icons";
import { Link } from "react-router-dom";

type Props = {
  item: any;
  handleIncrementProduct: (sku_id: string) => void;
  handleDecrementProduct: (sku_id: string) => void;
};

const CartItem = ({
  item,
  handleIncrementProduct,
  handleDecrementProduct,
}: Props) => {
  return (
    <>
      <Flex justifyContent={"space-between"} my={"4"} px={"5"}>
        <Flex gap="2" alignItems="center">
          <Box w="76px" h="76px">
            <Image
              src={item?.sku_id.image?.url}
              alt="name"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box ml={"5"}>
            <Text as={"p"} fontSize={"14px"} fontWeight="semibold">
              {item?.sku_id.name}
            </Text>

            <Box>
              <Text
                as={"p"}
                fontSize={"12px"}
                backgroundColor={"#F6F9FC"}
                my={"2"}
                fontWeight={500}
              >
                {item?.option_value?.join(",")}
              </Text>
            </Box>
            <Flex mt="2" h="38px">
              <Button
                border={"1px solid #ccc"}
                w={"20px"}
                h="full"
                borderRadius={"4px 0px 0px 4px"}
                bgColor={"White"}
                borderRight={"none"}
                color={"black"}
                onClick={() => handleDecrementProduct(item.sku_id._id)}
              >
                <MinusIcon size={5} />
              </Button>
              <Input
                w={"70px"}
                textAlign={"center"}
                borderRadius={"0px"}
                border={"1px solid #ccc"}
                h="full"
                fontWeight="bold"
                fontSize="md"
                value={item?.quantity}
              />
              <Button
                border={"1px solid #ccc"}
                w={"20px"}
                borderRadius={"0px 4px 4px 0px"}
                bgColor={"White"}
                color={"black"}
                borderLeft={"none"}
                h="full"
                onClick={() => handleIncrementProduct(item.sku_id._id)}
              >
                <PlusIcon size={5} />
              </Button>
            </Flex>
          </Box>
        </Flex>
        <Box>
          <Text as={"p"} textDecoration={"line-through"} fontSize={"12px"}>
            {item?.price_before_discount?.toLocaleString()}
          </Text>
          <Text
            as={"p"}
            fontSize={"lg"}
            color={"#FE3464"}
            fontWeight={"semibold"}
          >
            {item?.price?.toLocaleString()}đ
          </Text>
          <Button
            backgroundColor={"white"}
            color={"black"}
            fontSize="12px"
            rightIcon={<CloseIcon size={4} />}
            _hover={{ background: "#f1f1f1" }}
          >
            Xóa
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default CartItem;

import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import ItemBonus from "./ItemBonus";
import { CloseIcon, MinusIcon, PlusIcon } from "~/components/common/Icons";
import { Link } from "react-router-dom";

type Props = {
  data: any;
  handleIncement: (product: any) => void;
  handleDercement: (product: any) => void;
  handleRemove: (product: any) => void;
};

const ItemCart = ({
  data,
  handleDercement,
  handleIncement,
  handleRemove,
}: Props) => {
  return (
    <>
      {data.products.map((product: any) => {
        return (
          <Flex
            justifyContent={"space-between"}
            my={"4"}
            px={"5"}
            key={product?._id}
          >
            <Flex gap="2" alignItems="center">
              <Box w="76px" h="76px">
                <Image
                  src={product?.image?.url}
                  alt="name"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <Box ml={"5"}>
                <Link to={`/${product?.shared_url}`} color="text.black">
                  <Text as={"p"} fontSize={"14px"} fontWeight="semibold">
                    {product.name}
                  </Text>
                </Link>

                <Box>
                  <Text
                    as={"p"}
                    fontSize={"12px"}
                    backgroundColor={"#F6F9FC"}
                    my={"2"}
                    fontWeight={500}
                  >
                    {product.option_value.toString()}
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
                    onClick={() => handleIncement(product)}
                    _hover={{ background: "#f1f1f1" }}
                  >
                    <MinusIcon size={5} />
                  </Button>
                  <Input
                    value={product.quantity}
                    w={"70px"}
                    textAlign={"center"}
                    borderRadius={"0px"}
                    border={"1px solid #ccc"}
                    h="full"
                    fontWeight="bold"
                    fontSize="md"
                  />
                  <Button
                    border={"1px solid #ccc"}
                    w={"20px"}
                    borderRadius={"0px 4px 4px 0px"}
                    bgColor={"White"}
                    color={"black"}
                    borderLeft={"none"}
                    h="full"
                    onClick={() => handleDercement(product)}
                    _hover={{ background: "#f1f1f1" }}
                  >
                    <PlusIcon size={5} />
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Box>
              <Text as={"p"} textDecoration={"line-through"} fontSize={"12px"}>
                {product.price_before_discount.toLocaleString()}
              </Text>
              <Text
                as={"p"}
                fontSize={"lg"}
                color={"#FE3464"}
                fontWeight={"semibold"}
              >
                {product.price.toLocaleString()}
              </Text>
              <Button
                backgroundColor={"white"}
                onClick={() => handleRemove(product)}
                color={"black"}
                fontSize="12px"
                rightIcon={<CloseIcon size={4} />}
                _hover={{ background: "#f1f1f1" }}
              >
                Xóa
              </Button>
            </Box>
          </Flex>
        );
      })}

      {/* <ItemBonus /> */}
    </>
  );
};

export default ItemCart;

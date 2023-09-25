import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "~/components/common/Icons";

type Props = {};

const ItemCart = (props: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      <Flex justifyContent={"space-between"} my={"4"}>
        <Flex gap="2" alignItems="center">
          <Box w="56px" h="56px">
            <Image
              src="https://images.thinkgroup.vn/unsafe/300x300/https://media-api-beta.thinkpro.vn/media/core/categories/2021/12/29/Rectangle%201461-7.png"
              alt="name"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box ml={"5"}>
            <Text as={"p"} fontSize={"14px"} fontWeight={"bold"}>
              Dell Inspiron 16 5630
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
    </>
  );
};

export default ItemCart;

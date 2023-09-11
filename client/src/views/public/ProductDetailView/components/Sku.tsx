import { Box, Divider, Flex, Grid, GridItem } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Button, Input, Text, Tooltip } from "@chakra-ui/react";
import {
  CopyIcon,
  MinusIcon,
  PlusIcon,
  WarningIcon,
} from "~/components/common/Icons";
import Gift from "./Gift";
import Buy from "./Buy";
type Props = {};

const tooltiptext =
  "Mới, Sealed: Là sản phẩm mới 100% chưa qua sử dụng còn nguyên tem niêm phong của nhà sản xuất trên vỏ hộp hoặc bao bì sản phẩm.";

const Sku = (props: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleDercement = () => {
    setQuantity(quantity - 1);
  };
  const handleIncement = () => {
    setQuantity(quantity + 1);
  };
  console.log(quantity);

  return (
    <>
      <Box bgColor={"white"} rounded={"6px"} p="6" mt="4">
        <Text
          fontSize={"sm"}
          rounded={"6px"}
          color="text.black"
          fontWeight="medium"
        >
          SKU: Dell Inspiron 16 5630
          <CopyIcon size={4} ml="2" color="text.blue" cursor="pointer" />
        </Text>
        <Text fontSize={"md"} fontWeight={600} rounded={"6px"} mt="2">
          Dell Inspiron 16 5630
        </Text>
        <Divider my="4" />
        <Box>
          <Text fontSize={"14px"} fontWeight="semibold" color={"#6B7075"}>
            Phiên bản
          </Text>
          {/* Phiên bản */}
          <Flex gap="3" mt="2" flexWrap="wrap">
            <Button
              bg={"#EBF3FF"}
              color={"#0065EE"}
              border={"#0065EE 1px solid"}
              fontSize={"12px"}
              px="3"
              py="6px"
              fontWeight={600}
              lineHeight="150%"
              maxW="120px"
              h="full"
              maxH="max-content"
              whiteSpace="pre-line"
            >
              i5 1340P, QHD+ 16GB, 512GB
            </Button>
            <Button
              bg={"#EBF3FF"}
              color={"#0065EE"}
              border={"#0065EE 1px solid"}
              fontSize={"12px"}
              px="3"
              py="6px"
              fontWeight={600}
              lineHeight="150%"
              maxW="120px"
              h="full"
              maxH="max-content"
              whiteSpace="pre-line"
            >
              i5 1340P, QHD+ 16GB, 512GB
            </Button>
          </Flex>
          <Text
            fontSize={"14px"}
            fontWeight="semibold"
            color={"#6B7075"}
            mt="2"
          >
            Màu
          </Text>
          {/* Màu */}
          <Flex gap="3" mt="2" flexWrap="wrap">
            <Button
              bg={"#EBF3FF"}
              color={"#0065EE"}
              border={"#0065EE 1px solid"}
              fontSize={"12px"}
              px="3"
              py="6px"
              fontWeight={600}
              lineHeight="150%"
              maxW="120px"
              h="full"
              maxH="max-content"
              whiteSpace="pre-line"
            >
              Plantium Silver
            </Button>
          </Flex>

          <Text
            fontSize={"14px"}
            fontWeight="semibold"
            color={"#6B7075"}
            mt="2"
          >
            Loại hàng
          </Text>
          <Flex mt="2" gap={"3"} flexWrap={"wrap"}>
            <Tooltip
              hasArrow
              label={tooltiptext}
              bg="bg.gray"
              color="text.black"
            >
              <Button
                bg={"#EBF3FF"}
                color={"#0065EE"}
                border={"#0065EE 1px solid"}
                fontSize={"12px"}
                fontWeight={600}
                px={3}
                py={"6px"}
                lineHeight={"150%"}
                h={"max-content"}
              >
                Mới, full box, nhập khẩu
                <WarningIcon size={5} ml="1" />
              </Button>
            </Tooltip>
            <Button
              bg={"#EBF3FF"}
              color={"#0065EE"}
              border={"#0065EE 1px solid"}
              fontSize={"12px"}
              fontWeight={600}
              px={3}
              py={"6px"}
              lineHeight={"150%"}
              h={"max-content"}
            >
              Mới, full box, nhập khẩu
              <WarningIcon size={5} ml="1" />
            </Button>
          </Flex>
          <Text
            fontSize={"14px"}
            fontWeight={"semibold"}
            color={"#6B7075"}
            mt="2"
          >
            Số lượng
          </Text>
          <Flex mt="2" h="38px">
            <Button
              border={"1px solid #ccc"}
              w={"20px"}
              h="full"
              borderRadius={"4px 0px 0px 4px"}
              bgColor={"White"}
              borderRight={"none"}
              color={"black"}
              onClick={() => handleDercement()}
            >
              <MinusIcon size={5} />
            </Button>
            <Input
              value={quantity}
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
              onClick={() => handleIncement()}
            >
              <PlusIcon size={5} />
            </Button>
          </Flex>
          <Divider my="4" />
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem>
              <Text fontSize={"lg"} fontWeight={600} color={"#FE3464"}>
                19.790.000
              </Text>
              <Flex pt={"1"}>
                <Text
                  as={"p"}
                  textDecoration={"line-through"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  pl={"1"}
                >
                  28.990.000
                </Text>
                <Text
                  as={"p"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  color={"#FE3464"}
                >
                  -32%
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"#0065EE"}
                bg={"#F5F6FC"}
              >
                Thêm vào giỏ
              </Button>
            </GridItem>
            <GridItem>
              <Button fontSize={"sm"} fontWeight={600}>
                Mua Ngay
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      {/* Quà Tặng kèm */}
      <Gift />
      {/* Mua thêm được giảm */}
      {/* <Buy /> */}
    </>
  );
};

export default Sku;

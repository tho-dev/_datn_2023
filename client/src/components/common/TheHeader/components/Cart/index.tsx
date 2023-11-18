import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { CartNotFoundIcon, CloseSmallIcon } from "~/components/common/Icons";

type Props = {
  data: any;
};

const Cart = ({ data }: Props) => {
  return (
    <Box
      w="500px"
      rounded="md"
      borderWidth="1px"
      borderColor="#E2E8F0"
      borderStyle="solid"
      bgColor="bg.white"
    >
      <Flex
        p="5"
        fontSize="sm"
        fontWeight="semibold"
        justifyContent="space-between"
        borderBottom="1px solid #e2e8f0"
      >
        <Text color="text.black">
          {data ? data?.products?.length : 0} sản phẩm
        </Text>
        <Link to="gio-hang" as={ReactRouterLink} color="text.blue">
          Xem tất cả
        </Link>
      </Flex>
      <Flex px="4" flexDirection="column">
        {data?.products?.length > 0 ? (
          data?.products.map((product: any, index: number) => {
            return (
              <Flex
                key={index}
                w="full"
                my="3"
                position="relative"
                role="group"
                borderBottom="1px solid #e2e8f0"
              >
                <Box w="86px" h="86px" ml="3" position="relative">
                  <Image
                    w="full"
                    h="full"
                    objectFit="cover"
                    borderRadius="md"
                    src={product?.image?.url}
                  />
                  <Box
                    position="absolute"
                    top="0"
                    px="2px"
                    bgColor="bg.gray"
                    fontSize="sm"
                    color="text.black"
                    rounded="sm"
                    fontWeight="semibold"
                  >
                    x{product?.quantity}
                  </Box>
                </Box>
                <Flex ml="4" fontSize="md" flexDirection="column">
                  <Link
                    to={product?.shared_url}
                    as={ReactRouterLink}
                    color="text.black"
                  >
                    <Text
                      fontSize="sm"
                      color="text.black"
                      fontWeight="semibold"
                      css={{
                        display: "-webkit-block",
                        maxWidth: "100%",
                        maxHeight: "74px",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        visibility: "visible",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product?.name}
                    </Text>
                  </Link>

                  <Text
                    mt="1"
                    fontSize="xs"
                    color="text.black"
                    fontWeight="medium"
                  >
                    {product?.option_value.toString()}
                  </Text>
                  <Flex
                    gap="2"
                    fontSize="xs"
                    color="text.black"
                    fontWeight="semibold"
                    mt="1"
                  >
                    <Text as="span" color="text.red">
                      {product?.price.toLocaleString()}
                    </Text>
                    <Text as="span" textDecoration="line-through">
                      {product?.price_before_discount.toLocaleString()}
                    </Text>
                  </Flex>
                </Flex>
                {/* <Box
                  position="absolute"
                  right="0"
                  display="inline-flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  visibility="hidden"
                  transform="all 0.25s ease-in"
                  _groupHover={{
                    visibility: "visible",
                  }}
                >
                  <CloseSmallIcon size={4} />
                </Box> */}
              </Flex>
            );
          })
        ) : (
          <Box>
            <Box textAlign={"center"}>
              <CartNotFoundIcon />
              <Text
                fontSize={"18px"}
                lineHeight={"150%"}
                fontWeight={600}
                my={"12px"}
              >
                Giỏ hàng trống{" "}
              </Text>
            </Box>
          </Box>
        )}
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        fontWeight="semibold"
        color="text.black"
        px="5"
        pt="1"
        pb="3"
      >
        <Text fontSize="sm">Tổng tiền:</Text>
        <Text fontSize="xl">
          {data?.products?.length > 0 ? data?.total_money?.toLocaleString() : 0}{" "}
          đ
        </Text>
      </Flex>
    </Box>
  );
};

export default Cart;

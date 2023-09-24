import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Image, Divider, Button } from "@chakra-ui/react";
import { PlusIcon, Star } from "./../../common/Icons";

type Props = {
  product?: any;
  mode?: string;
  showCompare?: boolean;
};

const ViewedList = ({ product, mode, showCompare }: Props) => {
  return (
    <Link
      to={`laptop/lg-gram`}
      as={ReactRouterLink}
      w="full"
      h="full"
      overflow="hidden"
      rounded="md"
      display="inline-block"
      backgroundColor="#f6f9fc"
      _hover={{
        textDecoration: "none",
      }}
    >
      <Box pb="100%" position="relative">
        <Box top="0" position="absolute">
          <Image
            w="full"
            h="full"
            objectFit="cover"
            src="https://images.thinkgroup.vn/unsafe/460x460/https://media-api-beta.thinkpro.vn/media/core/products/2022/8/3/LG-Gram-14-2022-ThinkPro-10.jpg"
          />
        </Box>
      </Box>
      <Flex p="4" flexDirection="column">
        <Heading as="h4" fontSize="sm" fontWeight="semibold">
          LG Gram 14 2022
        </Heading>
        <Flex gap="1" mt="1" alignItems="center" fontWeight="semibold">
          <Text fontSize="xs" color="text.gray">
            Từ
          </Text>
          <Text fontSize="md" color="text.red">
            19.999.000
          </Text>
          <Text
            p="2px"
            fontSize="10px"
            color="text.red"
            backgroundColor="#fff5f7"
          >
            -31%
          </Text>
        </Flex>
        <Flex gap="1" alignItems="center" fontWeight="semibold">
          <Text fontSize="xs" color="text.gray">
            4.7
          </Text>
          <Star size={4} />
          <Text fontSize="xs" color="text.gray">
            | Đã bán 25
          </Text>
        </Flex>
        <Divider my="3" />

        <Text
          color="text.black"
          fontSize="sm"
          fontWeight="medium"
          textDecoration="underline"
        >
          Quà tặng 400.000
        </Text>
        {showCompare && (
          <>
            <Divider my="3" />
            <Flex>
              <Button
                bgColor="white"
                color="blue"
                leftIcon={<PlusIcon size={4} />}
                padding={1}
              >
                So sánh
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Link>
  );
};

export default ViewedList;

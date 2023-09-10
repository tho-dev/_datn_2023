import { Box, Image, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import { ArrowRightIcon, CloseSmallIcon } from "~/components/common/Icons";

type Props = {};

const CardCompare = (props: Props) => {
  return (
    <Box
      w="full"
      h="full"
      overflow="hidden"
      rounded="md"
      display="inline-block"
      backgroundColor="bg.white"
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
            Màu
          </Text>
          <Flex>
            <Box w="3" h="3" rounded="sm" backgroundColor="red.200" />
          </Flex>
        </Flex>
        <Flex flexDirection="column" gap={2} mt={2}>
          <Button rightIcon={<ArrowRightIcon size={6} />} bgColor="blue">
            Xem Ngay
          </Button>
          <Button rightIcon={<CloseSmallIcon size={6} />}>Xoá</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardCompare;

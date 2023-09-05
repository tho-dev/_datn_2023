import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Image, Divider, Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {
  product?: any;
};

const CardView = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
      border="1px solid #ccc"
    >
      <Box pb="100%" position="relative">
        <Box top="0" position="absolute">
          <Image
            w="100%"
            objectFit="cover"
            src="https://images.thinkgroup.vn/unsafe/460x460/https://media-api-beta.thinkpro.vn/media/core/products/2022/8/3/LG-Gram-14-2022-ThinkPro-10.jpg"
          />
        </Box>
        <Menu>
          <MenuButton
            fontSize="sm"
            fontWeight="bold"
            w="5"
            h="5"
            rounded="sm"
            alignItems="center"
            justifyContent="center"
            color="text.admin2"
            bgColor="#f1f4f9"
            css={{
              "& span": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "-8px",
              },
            }}
            top="2"
            right={2}
            position="absolute"
          >
            ...
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Xóa</MenuItem>
            <MenuItem>Xem chi tiết</MenuItem>
            <MenuItem>Cập nhật</MenuItem>
          </MenuList>
        </Menu>
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
        <Divider my="2" />
        <>
          <Box color="text.black" fontSize="xs" fontWeight="medium">
            <Text>CPU: Core i7 1260P, 12 Cores</Text>
            <Text>CPU: Core i7 1260P, 12 Cores</Text>
            <Text>CPU: Core i7 1260P, 12 Cores</Text>
            <Text>CPU: Core i7 1260P, 12 Cores</Text>
          </Box>
        </>
      </Flex>
    </Box>
  );
};

export default CardView;

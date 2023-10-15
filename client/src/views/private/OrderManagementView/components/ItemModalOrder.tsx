import { GridItem, Flex, Heading, Box, Text, Center } from "@chakra-ui/layout";
import React from "react";
import { CheckIcon, ArrowUpIcon } from "~/components/common/Icons";

type Props = {
  icon?: any;
  color?: string;
  title?: string;
  number?: number | string;
};

const ItemModalOrder = ({
  icon = <ArrowUpIcon size={4} />,
  color = "#ccc",
  title,
  number,
}: Props) => {
  return (
    <GridItem
      borderWidth={{
        sm: "0",
        md: "0",
        lg: "1px",
        xl: "1px",
        "2xl": "1px",
      }}
      borderColor="#F1F4F9"
      rounded="md"
      bgColor="bg.lightGray"
      transition="all .8s ease"
      _hover={{
        transform: "translateY(-10px)",
        bgColor: "gray.200",
      }}
    >
      <Flex padding={4} alignItems="center" gap={4}>
        <Box>
          <Flex gap="3">
            <Flex
              w="12"
              h="12"
              rounded="md"
              bgColor={color + ".100"}
              alignItems="center"
              justifyContent="center"
            >
              {icon}
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Heading as="h3" fontSize="18" my="2" textTransform="capitalize">
            {title}
          </Heading>
          <Flex gap="1" alignItems="center">
            <Text color="#1AD598" fontSize="16" fontWeight="semibold">
              {number}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default ItemModalOrder;

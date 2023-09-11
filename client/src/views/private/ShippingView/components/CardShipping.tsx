import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";

import React from "react";
import { ArrowRightIcon } from "~/components/common/Icons";

type Props = {};

const CardShipping = (props: Props) => {
  return (
    <Box border="1px solid #ccc" padding={4} borderRadius="4px" bgColor="white">
      <Flex justifyContent="space-between" margin="5px 0">
        <Text fontSize="18px" fontWeight="bold">
          Themesbrand Logistics
        </Text>
        <Tag>Sample Tag</Tag>
      </Flex>
      <Text fontSize="14px" fontWeight="500">
        Track ID: TBL18754263542
      </Text>
      <Flex margin="5px 0" justifyContent="space-between" alignItems="center">
        <Text fontSize="14px" fontWeight="400">
          Delivery Date: 20 Jan, 2023
        </Text>
        <Button
          bgColor="none"
          color="black"
          rightIcon={<ArrowRightIcon size={4} />}
        >
          View
        </Button>
      </Flex>
    </Box>
  );
};

export default CardShipping;

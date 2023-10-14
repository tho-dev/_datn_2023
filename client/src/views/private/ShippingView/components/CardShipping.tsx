import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";

import React from "react";
import { ArrowRightIcon } from "~/components/common/Icons";
import moment from "moment";

type Props = {
  item: any;
  handleViewOrderDetail: (orderId: string) => void;
};

const CardShipping = ({ item, handleViewOrderDetail }: Props) => {
  return (
    <Box border="1px solid #ccc" padding={4} borderRadius="4px" bgColor="white">
      <Flex justifyContent="space-between" margin="5px 0">
        <Text fontSize="18px" fontWeight="bold">
          {item?.customer_name}
        </Text>
        <Tag textTransform="capitalize" fontSize="12px">
          {item.status}
        </Tag>
      </Flex>
      <Text fontSize="14px" fontWeight="500">
        Track ID: {item._id}
      </Text>
      <Flex margin="5px 0" justifyContent="space-between" alignItems="center">
        <Text fontSize="14px" fontWeight="400">
          Created Date: {moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
        <Button
          bgColor="none"
          color="black"
          rightIcon={<ArrowRightIcon size={4} />}
          onClick={() => handleViewOrderDetail(item._id)}
        >
          View
        </Button>
      </Flex>
    </Box>
  );
};

export default CardShipping;

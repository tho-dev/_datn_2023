import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { PlusIcon } from "~/components/common/Icons";
import FilterShipments from "./components/FilterShipments";
import TableShipment from "./components/TableShipment";

type Props = {};

const Shipments = (props: Props) => {
  return (
    <Box bgColor="white">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        margin="10px 0"
        padding={4}
      >
        <Text fontSize="18px" fontWeight="bold">
          Shipments
        </Text>
        <Button leftIcon={<PlusIcon size={4} />} bgColor="bg.darkGray">
          Add Shipping
        </Button>
      </Flex>
      <Box padding={4}>
        <FilterShipments />
      </Box>
      <Box padding={4}>
        <TableShipment />
      </Box>
    </Box>
  );
};

export default Shipments;

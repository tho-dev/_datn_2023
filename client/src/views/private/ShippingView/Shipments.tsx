import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import FilterShipments from "./components/FilterShipments";
import TableShipment from "./components/TableShipment";
import { useGetAllShippingQuery } from "~/redux/api/order";

type Props = {};

const Shipments = (props: Props) => {
  const { data, isLoading, isFetching, isError } = useGetAllShippingQuery("");
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  if (isError) {
    return <Box>isError...</Box>;
  }
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
      </Flex>
      <Box padding={4}>
        <FilterShipments />
      </Box>
      <Box padding={4}>
        <TableShipment data={data?.data?.items} />
      </Box>
    </Box>
  );
};

export default Shipments;

import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListCardShipping from "./components/ListCardShipping";
import { SearchIcon } from "~/components/common/Icons";
import ShippingDetail from "./components/ShippingDetail";
import { useGetAllShippingQuery } from "~/redux/api/order";

type Props = {};

const ShippingList = (props: Props) => {
  const { data, isLoading, isFetching, isError } = useGetAllShippingQuery("");
  const [orderId, setOrderId] = useState(data?.data.items[0]._id as string);
  if (isLoading) {
    return <Box>isLoading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  if (isError) {
    return <Box>isError...</Box>;
  }
  const handleViewOrderDetail = (orderId: string) => {
    setOrderId(orderId);
  };

  return (
    <Box width="100%" minHeight="100vh">
      <Text
        fontSize="18px"
        fontWeight="bold"
        padding={4}
        bgColor="white"
        my={4}
      >
        Shipping
      </Text>
      <Grid gridTemplateColumns="repeat(7,1fr)" gap={4}>
        <GridItem colSpan={2} bgColor="bg.white" padding={4} borderRadius={6}>
          <Box padding={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon size={4} />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Tìm kiếm hoá đơn..."
                outline="none"
                border="1px solid #ccc"
              />
            </InputGroup>
          </Box>
          <ListCardShipping
            items={data?.data.items}
            handleViewOrderDetail={handleViewOrderDetail}
          />
        </GridItem>
        <GridItem colSpan={5} padding={8} bgColor="bg.white">
          {orderId ? <ShippingDetail orderId={orderId} /> : <Box>Loading</Box>}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ShippingList;

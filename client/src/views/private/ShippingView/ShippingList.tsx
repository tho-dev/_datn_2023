import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import React from "react";
import ListCardShipping from "./components/ListCardShipping";
import { SearchIcon } from "~/components/common/Icons";
import ShippingDetail from "./components/ShippingDetail";

type Props = {};

const ShippingList = (props: Props) => {
  return (
    <Box width="100%" minHeight="100vh" bgColor="bg.white">
      <Text fontSize="18px" fontWeight="bold" padding={4}>
        Shipping
      </Text>
      <Grid gridTemplateColumns="repeat(7,1fr)" gap={4}>
        <GridItem colSpan={2}>
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

          <ListCardShipping />
        </GridItem>
        <GridItem colSpan={5} padding={4}>
          <ShippingDetail />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ShippingList;

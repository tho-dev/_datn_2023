import { Box, Text, Flex, Grid, GridItem, IconButton } from "@chakra-ui/react";
import React from "react";
import { CartIcon } from "~/components/common/Icons";

type Props = {};

const CardShippingDetail = (props: Props) => {
  return (
    <Grid
      border="1px solid #ccc"
      padding={4}
      borderRadius="4px"
      bgColor="white"
      gridTemplateColumns="repeat(4,1fr)"
      gap={2}
    >
      <GridItem colSpan={3}>
        <Text fontSize="18px" fontWeight="bold" margin="10px 0">
          Order Information
        </Text>
        <Box>
          <Text fontSize="14px" fontWeight="500">
            ID: #TBT84000142101
          </Text>
          <Text fontSize="14px" fontWeight="500">
            Amount Total: $723.65
          </Text>
          <Text fontSize="14px" fontWeight="500">
            Order Date: 05 Jan, 2023
          </Text>
        </Box>
      </GridItem>
      <GridItem>
        <IconButton
          px="10px"
          py="6px"
          border="1px"
          aria-label="Search database"
          icon={<CartIcon size={6} />}
          bgColor="inherit"
          color="black"
          boxShadow="xl"
        />
      </GridItem>
    </Grid>
  );
};

export default CardShippingDetail;

import { Box, Text, Flex, Grid, GridItem, IconButton } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  id: string;
  total?: string;
  date?: string;
  icon: any;
  color: any;
};

const CardShippingDetail = ({ title, id, total, date, icon, color }: Props) => {
  return (
    <Grid
      padding={4}
      borderRadius="4px"
      bgColor={color}
      gridTemplateColumns="repeat(4,1fr)"
      gap={2}
      minH="150px"
    >
      <GridItem colSpan={3}>
        <Text fontSize="18px" fontWeight="bold" margin="10px 0">
          {title}
        </Text>
        <Box>
          <Text fontSize="14px" fontWeight="semibold">
            {id}
          </Text>
          <Text fontSize="14px" fontWeight="semibold">
            {total}
          </Text>
          <Text fontSize="14px" fontWeight="semibold">
            {date}
          </Text>
        </Box>
      </GridItem>
      <GridItem>
        <IconButton
          px="10px"
          py="6px"
          aria-label="Search database"
          icon={icon}
          bgColor="transparent"
          color="black"
          boxShadow="xl"
        />
      </GridItem>
    </Grid>
  );
};

export default CardShippingDetail;

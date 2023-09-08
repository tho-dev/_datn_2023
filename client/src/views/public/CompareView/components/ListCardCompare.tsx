import { Box, Grid, GridItem, Flex, Text, Button } from "@chakra-ui/react";
import React from "react";
import CardCompare from "./CardCompare";

type Props = {};

const ListCardCompare = (props: Props) => {
  return (
    <Flex gap={4} padding={2} minHeight="400px">
      <Box w="20%">
        <Text fontWeight="bold" fontSize="24px">
          So sánh 2 sản phẩm
        </Text>
        <Box mt="10px">
          <Text fontSize="14px" lineHeight={6} fontWeight="medium">
            Dell Inspiron 16 5630
          </Text>
          <Text fontSize="14px" lineHeight={6} fontWeight="medium">
            Dell Inspiron 16 5630
          </Text>
        </Box>
      </Box>
      <Grid gridTemplateColumns="repeat(4,1fr)" w="80%" border="1px solid #ccc">
        <GridItem>
          <CardCompare />
        </GridItem>
        <GridItem borderLeft="1px solid #ccc">
          <CardCompare />
        </GridItem>
        <GridItem borderLeft="1px solid #ccc">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="80%"
          >
            <Button bgColor="bg.gray" color="blue">
              Thêm sản phẩm khác
            </Button>
          </Box>
        </GridItem>
        <GridItem borderLeft="1px solid #ccc">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="80%"
          >
            <Button bgColor="bg.gray" color="blue">
              Thêm sản phẩm khác
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ListCardCompare;

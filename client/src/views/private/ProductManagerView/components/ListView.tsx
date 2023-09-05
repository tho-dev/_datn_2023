import React from "react";
import CardView from "./CardView";
import { Box, Flex } from "@chakra-ui/layout";
import { Grid, GridItem, Button, Input } from "@chakra-ui/react";

type Props = {};

const ListView = (props: Props) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem>
        <CardView />
      </GridItem>
      <GridItem>
        <CardView />
      </GridItem>
      <GridItem>
        <CardView />
      </GridItem>
      <GridItem>
        <CardView />
      </GridItem>
      <GridItem>
        <CardView />
      </GridItem>
    </Grid>
  );
};

export default ListView;

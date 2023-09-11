import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import CardShipping from "./CardShipping";

type Props = {};

const ListCardShipping = (props: Props) => {
  return (
    <Flex
      maxHeight="100vh"
      padding={4}
      flexDirection="column"
      gap={4}
      overflow="auto"
    >
      <CardShipping />
      <CardShipping />
      <CardShipping />
      <CardShipping />
      <CardShipping />
      <CardShipping />
      <CardShipping />
    </Flex>
  );
};

export default ListCardShipping;

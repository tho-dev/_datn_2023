import React from "react";
import { Outlet } from "react-router";
import { Box } from "@chakra-ui/layout";

type Props = {};

const ShippingView = (props: Props) => {
  return (
    <Box padding={2}>
      <Outlet />
    </Box>
  );
};

export default ShippingView;

import React from "react";
import { Box, Button } from "@chakra-ui/react";
import Title from "./components/Title";
import ProductList from "./components/ProductList";
import FilterProduct from "./components/Filter";

type Props = {};

const SlugView = (props: Props) => {
  return (
    <Box m="30px 0">
      <Title />
      <FilterProduct title="Thương hiệu" />
      <ProductList />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="10px 0"
      >
        <Button
          bgColor="bg.white"
          color="blue"
          width="30%"
          fontWeight="bold"
          fontSize="md"
        >
          Xem thêm
        </Button>
      </Box>
    </Box>
  );
};

export default SlugView;

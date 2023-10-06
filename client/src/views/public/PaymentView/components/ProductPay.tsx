import React, { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "~/components/common/Icons";
import ItemProductPay from "./ItemProductPay";

type Props = {
  products: any;
};

const ProductPay = ({ products }: Props) => {
  const [show, setshow] = useState<boolean>(true);
  const showHandle = () => {
    setshow(!show);
  };
  return (
    <Box>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          as={"h5"}
          fontSize={"18px"}
          fontWeight={"600"}
          lineHeight={"27px"}
        >
          Sản Phẩm trong đơn
        </Text>
        <Box as={"button"} onClick={() => showHandle()}>
          <ChevronDownIcon color="black" size={8} />
        </Box>
      </Flex>
      <Box display={show ? "block" : "none"}>
        {products.map((product: any) => {
          return (
            <Box key={product._id}>
              <ItemProductPay product={product} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductPay;

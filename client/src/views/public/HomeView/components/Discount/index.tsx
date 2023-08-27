import React from "react";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import Slider from "./Slider";
import DiscountProducts from "./DiscountProducts";

type Props = {
  title?: string;
  items?: any;
};

const DiscountSection = ({ title, items }: Props) => {
  return (
    <Box pt="12">
      <Heading as="h2" fontSize="28px">
        {title}
      </Heading>
      <Box mt="5" py="6" rounded="md" backgroundColor="bg.pink">
        <Slider title={"Chương trình khuyến mãi nổi bật"} />
		<DiscountProducts title={"Sản phẩm khuyến mãi nổi bật"}/>
      </Box>
    </Box>
  );
};

export default DiscountSection;

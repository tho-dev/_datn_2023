import { Flex, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import emptybox from "~/assets/images/7486754.png";

const NotData = () => {
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems="center"
        flexDirection="column"
      >
        <Image
          src={emptybox}
          w={{
            xl: "150px",
            sm: "70px",
          }}
          h={{
            xl: "150px",
            sm: "70px",
          }}
          objectFit={"cover"}
        />
        <Text
          fontSize={"18px"}
          lineHeight={"150%"}
          fontWeight={600}
          my={"12px"}
        >
          Giỏ hàng trống{" "}
        </Text>
        <Text fontSize={"14px"} lineHeight={"150%"}>
          Hãy thoải mái lựa sản phẩm bạn nhé.
        </Text>
      </Flex>
      <Flex justifyContent={"center"}>
        <Button
          my={"24px"}
          bg={"blue.500"}
          fontSize={"16px"}
          as={ReactRouterLink}
          to="/"
        >
          Khám phá ngay
        </Button>
      </Flex>
    </>
  );
};

export default NotData;

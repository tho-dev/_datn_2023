import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      h="100vh"
      // bgImage={banner}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <GridItem
        w="100%"
        h="full"
        colSpan={{
          sm: 12,
          md: 12,
          lg: 12,
          xl: 5,
          "2xl": 5,
        }}
      >
        <Outlet />
      </GridItem>
      <GridItem
        w="100%"
        h="full"
        colSpan={{
          sm: 0,
          md: 0,
          lg: 0,
          xl: 7,
          "2xl": 7,
        }}
        bgColor="bg.red"
        borderTopLeftRadius="100px"
        borderBottomLeftRadius="100px"
      >
        <Flex w="full" h="full" alignItems="center" justifyContent="center">
          <Text
            fontSize="xl"
            fontWeight="medium"
            color="#ffffff"
            maxW="540px"
            textAlign="center"
          >
            Polytech - Laptop, Phím cơ, Bàn nâng hạ, Ghế công thái học, PS5,
            Nintendo - Dịch vụ Tận tâm. ✔✔✔
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default AuthLayout;

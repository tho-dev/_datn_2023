import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import PaySummary from "./components/PaySummary";
import ProductPay from "./components/ProductPay";
import Atstore from "./components/Atstore";
import ShipProduct from "./components/ShipProduct";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { atStoreSchema, shipSchema } from "~/validate/payment";
import axios from "axios";
import { data } from "~/views/private/DashboardView/components/TopCategory";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetCartQuery } from "~/redux/api/cart";

type Props = {};

const Payment = (props: Props) => {
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const { data, isLoading, isError } = useGetCartQuery(cart_id);
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(value === "1" ? atStoreSchema : shipSchema),
  });
  const submitForm = (data: any) => {
    console.log("value_", data);
    navigate("/check-otp");
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isError) {
    return <Box>Error...</Box>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>ThinkPro | Thanh toán</title>
      </Helmet>
      <Heading pt={"4"} fontSize={"20px"}>
        Thanh Toán
      </Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          my={"5"}
          w={"full"}
        >
          <Box
            backgroundColor={"white"}
            borderRadius={"md"}
            p={"24px"}
            mr={"5"}
            w={{ md: "80%", base: "full" }}
          >
            <Text fontSize={"20px"} fontWeight={600} as={"h3"}>
              Phương Thức Nhận Hàng
            </Text>
            <Box py={"16px"} borderBottom={"1px solid #E6E8EA"}>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row" gap={"24px"}>
                  <Radio value="1">Tại cửa Hàng</Radio>
                  <Radio value="2">Giao Tận nơi</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              {value === "1" && <Atstore register={register} errors={errors} />}
              {value === "2" && (
                <ShipProduct
                  registerShip={register}
                  errors={errors}
                  watch={watch}
                />
              )}
            </Box>
          </Box>
          <Box w={{ md: "40%", base: "full" }} h={"full"}>
            <Box
              backgroundColor={"white"}
              borderRadius={"md"}
              py={"5"}
              px={"5"}
            >
              <PaySummary data={data.data} transport_fee={50000} />
            </Box>
            <Box
              backgroundColor={"white"}
              borderRadius={"md"}
              py={"5"}
              px={"5"}
              mt={"16px"}
            >
              <ProductPay products={data.data.products} />
            </Box>
          </Box>
        </Box>
      </form>
    </HelmetProvider>
  );
};

export default Payment;

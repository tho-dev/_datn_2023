import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import ItemCart from "./components/ItemCart";
import OrderSummary from "./components/OrderSummary";
import { useNavigate } from "react-router-dom";
import NotData from "./components/NotData";
import { useAppSelector } from "~/redux/hook/hook";
import {
  useDecrementMutation,
  useGetCartQuery,
  useIncrementMutation,
  useRemoveMutation,
} from "~/redux/api/cart";

type Props = {};

const CartView = (props: Props) => {
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const { data, isLoading, isError } = useGetCartQuery(cart_id);
  const [decrement] = useDecrementMutation();
  const [increment] = useIncrementMutation();
  const [remove] = useRemoveMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isError) {
    return <Box>Error...</Box>;
  }

  const handlePayment = () => {
    if (data?.data?.products?.length <= 0) return;
    navigate("/thanh-toan");
  };

  const handleDercement = (product: any) => {
    const data = {
      sku_id: product.sku_id,
      cart_id: cart_id,
    };
    decrement(data)
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleIncement = (product: any) => {
    if (product.quantity === 1) return;
    const data = {
      sku_id: product.sku_id,
      cart_id: cart_id,
    };
    increment(data)
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = (product: any) => {
    const data = {
      sku_id: product.sku_id,
      cart_id: cart_id,
    };
    remove(data)
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>ThinkPro | Giỏ hàng của bạn</title>
      </Helmet>
      <Heading pt={"4"} fontSize={"20px"}>
        Giỏ hàng ({data?.data?.products?.length})
      </Heading>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        my={"5"}
        w={"full"}
      >
        <Box
          backgroundColor={"white"}
          borderRadius={"md"}
          py={"5"}
          mr={"5"}
          w={{ md: "80%", base: "full" }}
        >
          {data?.data?.products?.length === 0 ? (
            <NotData />
          ) : (
            <ItemCart
              data={data?.data}
              handleDercement={handleDercement}
              handleIncement={handleIncement}
              handleRemove={handleRemove}
            />
          )}
        </Box>
        <Box
          backgroundColor={"white"}
          borderRadius={"md"}
          py={"5"}
          px={"5"}
          w={{ md: "40%", base: "full" }}
          h={"full"}
        >
          <OrderSummary handlePayment={handlePayment} data={data.data} />
        </Box>
      </Box>
    </HelmetProvider>
  );
};

export default CartView;

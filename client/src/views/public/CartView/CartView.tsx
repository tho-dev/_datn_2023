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
import { Skeleton, SkeletonCircle, SkeletonText, FLex } from "@chakra-ui/react";

type Props = {};

const CartView = (props: Props) => {
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const { data, isLoading, isError, isFetching } = useGetCartQuery(cart_id);
  const [decrement, { isLoading: loadingDecrement }] = useDecrementMutation();
  const [increment, { isLoading: loadingIncrement }] = useIncrementMutation();
  const [remove, { isLoading: loadingRemove }] = useRemoveMutation();
  const navigate = useNavigate();
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

  if (isError) {
    return <Box>Error...</Box>;
  }
  if (isLoading) {
    return <Box>isLoading...</Box>;
  }
  return (
    <HelmetProvider>
      <Helmet>
        <title>ThinkPro | Giỏ hàng của bạn</title>
      </Helmet>
      <Heading pt={"4"} fontSize={"20px"}>
        Giỏ hàng ({data?.data?.products?.length || 0})
      </Heading>
      {isFetching || isLoading ? (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          my={"5"}
          w={"full"}
        >
          <Box
            backgroundColor={"white"}
            borderRadius={"md"}
            py={"10"}
            mr={"5"}
            w={{ md: "80%", base: "full" }}
          >
            <Flex gap={2} px={"5"} alignItems="center">
              <Skeleton w="76px" h="76px" borderRadius={8} />

              <Flex w="100%" flexDirection="column" gap={2}>
                <Flex justifyContent="space-between">
                  <Skeleton height="20px" w="30%" />
                  <Skeleton height="20px" w="25%" />
                </Flex>
                <Flex justifyContent="space-between">
                  <Skeleton height="20px" w="50%" />
                  <Skeleton height="20px" w="30%" />
                </Flex>
                <Flex justifyContent="space-between">
                  <Skeleton height="40px" w="40%" />
                  <Skeleton height="40px" w="20%" />
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Flex
            backgroundColor={"white"}
            borderRadius={"md"}
            py={"5"}
            px={"5"}
            w={{ md: "40%", base: "full" }}
            h={"full"}
            flexDirection="column"
            gap={4}
          >
            <Skeleton height="20px" width="50%" />
            <Skeleton height="20px" />

            <Skeleton height="20px" />
            <Skeleton height="40px" />
          </Flex>
        </Box>
      ) : (
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
                loadingDecrement={loadingDecrement}
                loadingIncrement={loadingIncrement}
                loadingRemove={loadingRemove}
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
      )}
    </HelmetProvider>
  );
};

export default CartView;

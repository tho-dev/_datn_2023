import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import logo from "~/assets/images/logo-thinkpro.svg";
import { useDeleteCartMutation, useRemoveMutation } from "~/redux/api/cart";
import { usePaymentStatusMutation } from "~/redux/api/order";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { removeCart } from "~/redux/slices/cartSlice";
import { v4 as uuidv4 } from "uuid";
type Props = {};

const ThankView = (props: Props) => {
  let payment: any = {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();
  const [paymentStatus] = usePaymentStatusMutation();
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const dispatch = useAppDispatch();

  const [deleteCart] = useDeleteCartMutation();

  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    payment = {
      ...payment,
      [param]: value,
    };
  }

  useEffect(() => {
    const del_cart = async () => {
      try {
        const res: any = await deleteCart(cart_id);
        if (res.data.status === 200) {
          dispatch(removeCart(uuidv4()));
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchApi = async () => {
      try {
        const data = await paymentStatus(payment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    del_cart();
  }, []);

  useEffect(() => {
    if (time == 0) {
      navigate("/");
    }
    const timeout = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgColor="white"
    >
      <Flex
        width="100%"
        height="700px"
        flexDirection="column"
        alignItems="center"
        padding={8}
        gap={4}
      >
        <Image src={logo} w="700px" h="64px" objectFit="contain" />
        <Text fontSize={60} fontWeight="bold" textTransform="capitalize">
          Thank You !
        </Text>
        <Text fontSize={20} fontWeight="semibold">
          Đơn hàng đã đặt thành công, bạn sẽ được chuyển đến trang chủ sau{" "}
          {time}
        </Text>
        <Link to="/">
          <Button bg="bg.green"> Chuyển đến ngay</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default ThankView;

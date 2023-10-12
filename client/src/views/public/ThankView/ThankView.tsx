import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import logo from "~/assets/images/logo-thinkpro.svg";
import { usePaymentStatusMutation } from "~/redux/api/order";

type Props = {};

const ThankView = (props: Props) => {
  let payment: any = {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();
  const [paymentStatus] = usePaymentStatusMutation();

  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    payment = {
      ...payment,
      [param]: value,
    };
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await paymentStatus(payment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
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

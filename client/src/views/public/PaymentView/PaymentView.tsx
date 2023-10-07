import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import PaySummary from "./components/PaySummary";
import ProductPay from "./components/ProductPay";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetCartQuery } from "~/redux/api/cart";
import PopupCheckOtp from "./components/PopupCheckOtp";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Link,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { ArrowRightUpIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Link as ReactRouterLink } from "react-router-dom";
import Transport from "./components/Transport";

type Props = {};

const Payment = (props: Props) => {
  const [methodOrder, setMethodOrder] = React.useState("at_store");
  const [methodPayment, setMethodPayment] = React.useState("tructiep");
  const [address, setAddress] = React.useState("");
  const [transportFee, setTransportFee] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const { data, isLoading, isError } = useGetCartQuery(cart_id);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitForm = (data: any) => {
    setOpen(!open);
    console.log("value_", data);
  };
  const handleChooseAdress = (data: any) => {
    const checkData = data.every((select: any) => select !== undefined);
    if (checkData) {
      setAddress(data?.join(","));
      axios
        .post(`${process.env.VITE_API_URL}/order/calculateFee`, {
          location: data?.join(","),
        })
        .then(({ data }) => {
          setTransportFee(data.data);
        });
    } else {
      setAddress("");
    }
  };
  const addressWatch = watch("shipping_address");
  if (addressWatch && methodOrder == "shipped") {
    axios
      .post(`${process.env.VITE_API_URL}/order/calculateFee`, {
        location: addressWatch,
      })
      .then(({ data }) => {
        setTransportFee(data.data);
      });
  }
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
              <RadioGroup
                onChange={(value) => {
                  setMethodOrder(value);
                  if (value === "at_store") {
                    setTransportFee(0);
                  }
                }}
                value={methodOrder}
              >
                <Stack direction="row" gap={"24px"}>
                  <Radio
                    value="at_store"
                    checked
                    {...register("shipping_method")}
                  >
                    Tại cửa Hàng
                  </Radio>
                  <Radio value="shipped" {...register("shipping_method")}>
                    Giao Tận nơi
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box mt={"12px"}>
              <Text
                mb={"16px"}
                fontSize={"16px"}
                lineHeight={"150%"}
                fontWeight={600}
              >
                Thông tin người nhận
              </Text>
              {/* tên người nhận và số điện thoại */}
              <Flex gap={"16px"}>
                <FormControl isInvalid={errors.name as any}>
                  <FormLabel>Tên người nhận</FormLabel>
                  <Input
                    type="text"
                    border={"none"}
                    p={"8px 12px"}
                    placeholder="Nhập họ và tên"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("customer_name", {
                      required: "Trường bắt buộc nhập",
                    })}
                  />
                  <FormErrorMessage>
                    {" "}
                    {(errors.customer_name as any) &&
                      (errors?.customer_name?.message as any)}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.phone as any}>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    type="text"
                    border={"none"}
                    p={"8px 12px"}
                    placeholder="Nhập số điện thoại"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("phone_number", {
                      required: "Trường bắt buộc nhập",
                    })}
                  />
                  <FormErrorMessage>
                    {" "}
                    {(errors.phone_number as any) &&
                      (errors?.phone_number?.message as any)}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              {/* khu vực và địa chỉ nhận hàng */}
              {methodOrder == "shipped" && (
                <Flex gap={"16px"} mt={"16px"}>
                  <FormControl isInvalid={errors?.district as any}>
                    <FormLabel>Khu Vực</FormLabel>
                    <Box
                      border={"none"}
                      bg={"#F6F9FC"}
                      borderRadius={"6px"}
                      fontSize={"14px"}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      cursor="pointer"
                      onClick={onOpen}
                    >
                      <Input
                        type="text"
                        cursor="pointer"
                        p={"12px 12px"}
                        w="90%"
                        placeholder="Chọn địa chỉ giao hàng"
                        h="100%"
                        border="none"
                        bg="transparent"
                        readOnly={true}
                        {...register("shipping_address", {
                          required: "Trường bắt buộc nhập",
                        })}
                        value={address}
                        onClick={handleChooseAdress}
                      />
                      <NavArrowRightIcon
                        size={4}
                        strokeWidth={2}
                        color="text.black"
                      />
                    </Box>
                    <FormErrorMessage>
                      {(errors?.shipping_address as any) &&
                        (errors?.shipping_address?.message as any)}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.address as any}>
                    <FormLabel>Địa chỉ nhận hàng</FormLabel>
                    <Input
                      type="text"
                      border={"none"}
                      p={"8px 12px"}
                      placeholder="Địa chỉ nhận hàng"
                      bg={"#F6F9FC"}
                      borderRadius={"6px"}
                      fontSize={"14px"}
                      {...register("address", {
                        required: "Trường bắt buộc nhập",
                      })}
                    />
                    <FormErrorMessage>
                      {(errors?.address as any) &&
                        (errors?.address?.message as any)}
                    </FormErrorMessage>
                    <FormHelperText fontSize="12px" fontWeight="semibold">
                      Có thể là số nhà, tên đường, tòa nhà. VD: Số 53 Thái Hà
                    </FormHelperText>
                  </FormControl>
                </Flex>
              )}

              <Box mt={"16px"}>
                <FormControl isInvalid={errors?.storeAddress as any}>
                  <FormLabel>Địa chỉ cửa hàng</FormLabel>
                  <Stack
                    direction="column"
                    gap={"16px"}
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    px={"8px"}
                  >
                    <Radio
                      isChecked
                      fontSize={"12px"}
                      {...register("shop_address")}
                      value="Tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh Văn
                          Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam"
                    >
                      <Box p="4" rounded="md" fontSize="sm" color="text.black">
                        <Text fontWeight="semibold">Thủ đô Hà Nội</Text>
                        <Text>
                          {" "}
                          Tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh Văn
                          Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam
                        </Text>
                        <Flex
                          mt="2"
                          alignItems="flex-end"
                          justifyContent="space-between"
                        >
                          <Box fontSize="xs">
                            <Text fontWeight="semibold" color="#f93920">
                              Đã đóng cửa, hẹn bạn 09:00 ngày mai
                            </Text>
                            <Text fontWeight="medium">09:00 - 21:00</Text>
                          </Box>
                          <Link
                            as={ReactRouterLink}
                            fontSize="xs"
                            color="text.blue"
                            fontWeight="bold"
                            textDecoration="none"
                          >
                            Chỉ đường
                            <ArrowRightUpIcon size={4} />
                          </Link>
                        </Flex>
                      </Box>
                    </Radio>
                  </Stack>
                </FormControl>
              </Box>
              <Box mt={"16px"}>
                <FormControl isInvalid={errors?.payment as any}>
                  <FormLabel>Chọn phương thức thanh toán</FormLabel>
                  <RadioGroup onChange={setMethodPayment} value={methodPayment}>
                    <Stack direction="row" gap={"16px"} spacing={4}>
                      <Radio
                        value="tructiep"
                        fontSize={"12px"}
                        {...register("payment_method")}
                      >
                        Thanh toán khi nhận hàng
                      </Radio>
                      <Radio
                        value="online"
                        fontSize={"12px"}
                        {...register("payment_method")}
                      >
                        Thanh toán online
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Flex mt={"16px"}>
                <FormControl isInvalid={errors?.note as any}>
                  <FormLabel>Ghi chú</FormLabel>
                  <Textarea
                    placeholder="Nhập ghi chú"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("content")}
                    border={"none"}
                  />
                </FormControl>
              </Flex>
            </Box>
          </Box>
          <Box w={{ md: "40%", base: "full" }} h={"full"}>
            <Box
              backgroundColor={"white"}
              borderRadius={"md"}
              py={"5"}
              px={"5"}
            >
              <PaySummary data={data.data} transport_fee={transportFee} />
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
      <PopupCheckOtp open={open} />
      <Transport
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleChooseAdress={handleChooseAdress}
      />
    </HelmetProvider>
  );
};

export default Payment;

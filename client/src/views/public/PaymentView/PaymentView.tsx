import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import {
  Button,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import PaySummary from "./components/PaySummary";
import ProductPay from "./components/ProductPay";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
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
import {
  chuyenDoiSoDienThoai,
  chuyenDoiSoDienThoaiVe0,
  formatPhoneNumber,
} from "~/utils/fc";
import { socket } from "~/App";
import { useGetValueCouponMutation } from "~/redux/api/coupon";
type Props = {};

const Payment = (props: Props) => {
  const [dataOrder, setDataOrder] = useState({} as any);
  const [methodOrder, setMethodOrder] = React.useState("at_store");
  const [methodPayment, setMethodPayment] = React.useState("tructiep");
  const [address, setAddress] = React.useState("");
  const [transportFee, setTransportFee] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [voucher_value, setVourcher_value] = useState(0);

  const {
    isOpen: isOpenOtp,
    onOpen: onOpenOtp,
    onClose: onCloseOtp,
  } = useDisclosure();
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const { user, isLogin } = useAppSelector(
    (state) => state.persistedReducer.global
  );
  const { data, isLoading, isError } = useGetCartQuery(cart_id);
  const [getValueCoupon] = useGetValueCouponMutation();
  useEffect(() => {
    socket.emit(
      "joinRoom",
      "don-hang",
      user._id ?? "123",
      user.role ?? "customer"
    );
  }, []);
  const shopAdress =
    "13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const submitForm = (order_infor: any) => {
    // kiểm tra số điện thoại
    const compare_phone_number = chuyenDoiSoDienThoai(order_infor.phone_number);
    if (!compare_phone_number) {
      alert("Số điện thoại không hợp lệ");
      return;
    }
    const new_data = {
      ...order_infor,
      cart_id: cart_id,
      total_amount: data.data.total_money + transportFee,
      phone_number: compare_phone_number,
      transportation_fee: transportFee,
    };

    setDataOrder(new_data);
    onOpenOtp();
  };
  const voucher = watch("voucher");
  const checkvoucher = (voucher_code: string) => {
    getValueCoupon({ coupon_code: voucher_code })
      .unwrap()
      .then((data) => {
        setVourcher_value(data?.data);
        toast({
          title: "Hệ thống thông báo",
          description: "Áp dụng voucher thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        setVourcher_value(0);
        toast({
          title: "Hệ thống thông báo",
          description: err.data.errors.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      });
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
          onClose();
        });
    } else {
      setAddress("");
    }
  };
  const addressWatch = watch("shipping_address");

  useEffect(() => {
    if (addressWatch && methodOrder == "shipped") {
      axios
        .post(`${process.env.VITE_API_URL}/order/calculateFee`, {
          location: addressWatch,
        })
        .then(({ data }) => {
          setTransportFee(data.data);
        });
    }
  }, [methodOrder]);
  useEffect(() => {
    if (!voucher) {
      setVourcher_value(0);
    }
  }, [voucher]);

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
                isDisabled={data.data.products.length === 0}
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
                <FormControl isInvalid={errors.customer_name as any}>
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
                    defaultValue={
                      (isLogin && user.first_name + " " + user.last_name) || ""
                    }
                    isDisabled={data.data.products.length === 0}
                  />
                  <FormErrorMessage>
                    {" "}
                    {(errors.customer_name as any) &&
                      (errors?.customer_name?.message as any)}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.phone_number as any}>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    type="number"
                    border={"none"}
                    p={"8px 12px"}
                    placeholder="Nhập số điện thoại"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("phone_number", {
                      required: "Trường bắt buộc nhập",
                    })}
                    isDisabled={data.data.products.length === 0}
                    defaultValue={
                      (isLogin &&
                        `${chuyenDoiSoDienThoaiVe0(user.phone.toString())}`) ||
                      ""
                    }
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
                  <FormControl isInvalid={errors?.shipping_address as any}>
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
                        isDisabled={data.data.products.length === 0}
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
                      isDisabled={data.data.products.length === 0}
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
                      value={shopAdress.trim()}
                      isDisabled={data.data.products.length === 0}
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
                  <RadioGroup
                    onChange={setMethodPayment}
                    value={methodPayment}
                    isDisabled={data.data.products.length === 0}
                  >
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
              <Box my={4}>
                <FormControl isInvalid={errors?.voucher as any}>
                  <FormLabel>Bạn đã có mã khuyến mãi ?</FormLabel>
                  <Flex alignItems={"center"} gap={4}>
                    <Input
                      type="text"
                      border={"none"}
                      p={"8px 12px"}
                      placeholder="Nhập voucher vào đây"
                      bg={"#F6F9FC"}
                      borderRadius={"6px"}
                      fontSize={"14px"}
                      {...register("voucher")}
                    />
                    <Button
                      type="button"
                      onClick={() => checkvoucher(voucher)}
                      bgColor={voucher ? "bg.red" : "bg.darkGray"}
                    >
                      Kiểm tra
                    </Button>
                  </Flex>
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
                    isDisabled={data.data.products.length === 0}
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
              <PaySummary
                data={data.data}
                transport_fee={transportFee}
                voucher_value={voucher_value}
              />
              <Button
                w={"full"}
                fontSize={"16px"}
                fontWeight={"600 "}
                type="submit"
                _hover={{ bgColor: "red" }}
                isDisabled={data.data.products.length === 0}
              >
                Mua Ngay
              </Button>
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
      <PopupCheckOtp
        isOpenOtp={isOpenOtp}
        onOpenOtp={onOpenOtp}
        onCloseOtp={onCloseOtp}
        dataOrder={dataOrder}
      />
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

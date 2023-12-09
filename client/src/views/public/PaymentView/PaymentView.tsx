import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Link,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import momo from "~/assets/images/momo.png";
import vnpay from "~/assets/images/vnpay.png";
import LoadingPolytech from "~/components/LoadingPolytech";
import { ArrowRightUpIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { useGetCartQuery } from "~/redux/api/cart";
import { useGetValueCouponMutation } from "~/redux/api/coupon";
import { useAppSelector } from "~/redux/hook/hook";
import { chuyenDoiSoDienThoai } from "~/utils/fc";
import CommonBox from "./components/CommonBox";
import PaySummary from "./components/PaySummary";
import PopupCheckOtp from "./components/PopupCheckOtp";
import ProductPay from "./components/ProductPay";
import Transport from "./components/Transport";

const Payment = () => {
  const [dataOrder, setDataOrder] = useState({} as any);
  const [methodOrder, setMethodOrder] = React.useState("at_store");
  const [methodPayment, setMethodPayment] = React.useState("tructiep");
  const [payment, setPayment] = React.useState("MOMO");
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
  const { data, isLoading } = useGetCartQuery(cart_id);
  const [getValueCoupon] = useGetValueCouponMutation();
  const shopAdress =
    "13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
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
      total_amount: data?.data.total_money + transportFee - voucher_value,
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
          title: "Áp dụng voucher thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        setVourcher_value(0);
        toast({
          title: err.data.errors.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        setValue("voucher", "");
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
    return <LoadingPolytech />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Polytech | Thanh toán</title>
      </Helmet>
      <Heading pt={"4"} fontSize={"xl"}>
        Thanh Toán
      </Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          my={"5"}
          w={"full"}
          rounded="2xl"
        >
          <Flex
            rounded="xl"
            px="6"
            py="8"
            mr={"5"}
            gap="6"
            flexDir="column"
            backgroundColor={"white"}
            w={{ md: "70%", base: "full" }}
          >
            <CommonBox title="Thông Tin Người Nhận">
              <Flex gap="4" flexDir="column">
                <Flex gap="4">
                  <FormControl isInvalid={errors.customer_name as any}>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Người nhận
                    </FormLabel>
                    <Input
                      type="text"
                      fontSize="13px"
                      placeholder="Nhập họ và tên"
                      {...register("customer_name", {
                        required: "Trường bắt buộc nhập",
                      })}
                      defaultValue={
                        (isLogin && user.first_name + " " + user.last_name) ||
                        ""
                      }
                      isDisabled={data.data.products.length === 0}
                    />
                    <FormErrorMessage>
                      {(errors.customer_name as any) &&
                        (errors?.customer_name?.message as any)}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.phone_number as any}>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      SĐT
                    </FormLabel>
                    <Input
                      type="number"
                      fontSize="13px"
                      placeholder="Nhập số điện thoại"
                      {...register("phone_number", {
                        required: "Trường bắt buộc nhập",
                      })}
                      isDisabled={data.data.products.length === 0}
                      defaultValue={(isLogin && `0${user.phone}`) || 0}
                    />
                    <FormErrorMessage>
                      {(errors.phone_number as any) &&
                        (errors?.phone_number?.message as any)}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={errors?.note as any} w="full">
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Ghi chú
                  </FormLabel>
                  <Textarea
                    placeholder="Nhập ghi chú"
                    fontSize={"14px"}
                    {...register("content")}
                    isDisabled={data.data.products.length === 0}
                  />
                </FormControl>
              </Flex>
            </CommonBox>

            <CommonBox title="Phương Thức Nhận Hàng">
              <Flex flexDir="column">
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
                      size="sm"
                      fontSize="13px"
                      fontWeight="semibold"
                      value="at_store"
                      checked
                      {...register("shipping_method")}
                    >
                      <Text fontSize="sm" fontWeight="semibold">
                        Tại cửa hàng
                      </Text>
                    </Radio>
                    <Radio
                      size="sm"
                      fontSize="13px"
                      fontWeight="semibold"
                      value="shipped"
                      {...register("shipping_method")}
                    >
                      <Text fontSize="sm" fontWeight="semibold">
                        Giao tận nơi
                      </Text>
                    </Radio>
                  </Stack>
                </RadioGroup>

                {/* khu vực và địa chỉ nhận hàng */}
                {methodOrder == "shipped" ? (
                  <Flex gap={"16px"} mt={"16px"}>
                    <FormControl isInvalid={errors?.shipping_address as any}>
                      <Box
                        h="48px"
                        px="3"
                        py="2"
                        borderRadius={"8px"}
                        fontSize={"13px"}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        cursor="pointer"
                        border="1px solid #e9ebec"
                        onClick={onOpen}
                      >
                        <Input
                          type="text"
                          cursor="pointer"
                          px="0"
                          w="90%"
                          placeholder="Chọn địa chỉ giao hàng"
                          h="100%"
                          border="none"
                          bgColor="transparent"
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
                      <Input
                        type="text"
                        placeholder="Địa chỉ nhận hàng"
                        fontSize={"13px"}
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
                ) : (
                  <Box mt={"16px"}>
                    <FormControl isInvalid={errors?.storeAddress as any}>
                      <Stack
                        direction="column"
                        gap={"16px"}
                        bg={"#F6F9FC"}
                        px="6"
                        rounded="lg"
                      >
                        <Radio
                          isChecked
                          size="sm"
                          fontSize={"12px"}
                          {...register("shop_address")}
                          value={shopAdress.trim()}
                          isDisabled={data.data.products.length === 0}
                        >
                          <Box
                            p="4"
                            rounded="md"
                            fontSize="sm"
                            color="text.black"
                          >
                            <Text fontSize="13px" fontWeight="bold">
                              Hà Nội
                            </Text>
                            <Text fontSize="13px" fontWeight="semibold">
                              Tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh
                              Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
                            </Text>
                            <Flex
                              mt="2"
                              alignItems="flex-end"
                              justifyContent="space-between"
                            >
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
                )}
              </Flex>
            </CommonBox>

            <CommonBox title="Phương Thức Thanh Toán">
              <Box>
                <FormControl isInvalid={errors?.payment as any}>
                  <RadioGroup
                    onChange={setMethodPayment}
                    value={methodPayment}
                    isDisabled={data.data.products.length === 0}
                  >
                    <Stack direction="row" gap={"16px"} spacing={4}>
                      <Radio
                        size="sm"
                        value="tructiep"
                        fontSize={"12px"}
                        fontWeight="semibold"
                        {...register("payment_method")}
                      >
                        <Text fontSize="sm" fontWeight="semibold">
                          Thanh toán khi nhận hàng
                        </Text>
                      </Radio>
                      <Radio
                        size="sm"
                        value="online"
                        fontSize={"12px"}
                        fontWeight="semibold"
                        {...register("payment_method")}
                      >
                        <Text fontSize="sm" fontWeight="semibold">
                          Thanh toán online
                        </Text>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {methodPayment == "online" && (
                  <Flex mt="4" flexDir="column">
                    <RadioGroup onChange={setPayment} value={payment}>
                      <Flex w="100%" gap="6">
                        <Box px="6" flex="1" bgColor="#F6F9FC" rounded="lg">
                          <Radio
                            w="full"
                            value="MOMO"
                            size="sm"
                            fontSize={"12px"}
                            __css={{
                              "& > span": {
                                w: "-webkit-fit-content",
                              },
                            }}
                          >
                            <Flex
                              w="full"
                              px="3"
                              py="4"
                              gap="3"
                              rounded="md"
                              fontSize="sm"
                              color="text.black"
                            >
                              <Box flex="1">
                                <Text fontSize="13px" fontWeight="bold">
                                  MOMO
                                </Text>
                                <Text fontSize="13px" fontWeight="semibold">
                                  Thanh toán qua ví MOMO
                                </Text>
                              </Box>
                              <Box w="10" h="10" rounded="md" overflow="hidden">
                                <Image
                                  src={momo}
                                  objectFit="contain"
                                  w="full"
                                  h="full"
                                />
                              </Box>
                            </Flex>
                          </Radio>
                        </Box>
                        <Box flex="1" px="6" bgColor="#F6F9FC" rounded="lg">
                          <Radio
                            value="VNPAY"
                            size="sm"
                            fontSize={"12px"}
                            isReadOnly
                          >
                            <Flex
                              w="full"
                              px="3"
                              py="4"
                              gap="3"
                              rounded="md"
                              fontSize="sm"
                              color="text.black"
                            >
                              <Box flex="1">
                                <Text fontSize="13px" fontWeight="bold">
                                  VNPAY
                                </Text>
                                <Text fontSize="13px" fontWeight="semibold">
                                  Thanh toán qua ví VNPAY
                                </Text>
                              </Box>
                              <Box w="10" h="10" rounded="md" overflow="hidden">
                                <Image
                                  src={vnpay}
                                  objectFit="contain"
                                  w="full"
                                  h="full"
                                />
                              </Box>
                            </Flex>
                          </Radio>
                        </Box>
                      </Flex>
                    </RadioGroup>
                  </Flex>
                )}
              </Box>
            </CommonBox>

            <CommonBox title="Voucher">
              <Flex alignItems={"center"} gap={4}>
                <Input
                  type="text"
                  placeholder="Nhập voucher vào đây"
                  fontSize={"13px"}
                  {...register("voucher")}
                />
                <Button
                  type="button"
                  onClick={() => checkvoucher(voucher)}
                  color={voucher ? "text.textDelete" : "text.white"}
                  bgColor={voucher ? "bg.bgDelete" : "bg.red"}
                >
                  Áp Dụng
                </Button>
              </Flex>
            </CommonBox>
          </Flex>
          <Box rounded="xl" w={{ md: "30%", base: "full" }} h={"full"}>
            <Box backgroundColor={"white"} rounded={"xl"} py={"8"} px={"6"}>
              <PaySummary
                data={data.data}
                transport_fee={transportFee}
                voucher_value={voucher_value}
              />
              <Button
                w={"full"}
                fontWeight={"600"}
                type="submit"
                isDisabled={data.data.products.length === 0}
              >
                Mua Ngay
              </Button>
            </Box>
            <Box
              backgroundColor={"white"}
              rounded={"xl"}
              py={"8"}
              px={"6"}
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
        payment={payment}
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

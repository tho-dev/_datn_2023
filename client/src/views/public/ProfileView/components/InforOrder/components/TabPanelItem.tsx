import {
  Box,
  Divider,
  Flex,
  TabPanel,
  Text,
  Tag,
  useDisclosure,
  Heading,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Textarea,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import ItemCart from "./ItemCart";
import {
  useCancelOrderMutation,
  useGetOrderByUserIdQuery,
} from "~/redux/api/order";
import { useAppSelector } from "~/redux/hook/hook";
import DialogThinkPro from "~/components/DialogThinkPro";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavArrowRightIcon } from "~/components/common/Icons";
import TableProduct from "~/views/private/OrderManagementView/childrenViews/TableProduct";
import { createColumnHelper } from "@tanstack/react-table";
import Transport from "~/views/public/PaymentView/components/Transport";
import axios, { Axios } from "axios";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";

type Props = {
  status: string;
};

const TabPanelItem = ({ status }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();
  const {
    isOpen: isOpenTransport,
    onOpen: onOpenTransport,
    onClose: onCloseTransport,
  } = useDisclosure();
  const [address, setAddress] = React.useState("");
  const [transportFee, setTransportFee] = useState(0);

  const [orderDetail, setOrderDetail] = useState({} as any);
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const { data, isLoading, isFetching } = useGetOrderByUserIdQuery(user._id);
  const toast = useToast();
  const [cancelOrder] = useCancelOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const columnHelper = createColumnHelper<any>();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  const filteredOrders = data.data.filter(
    (order: any) => order.status == status
  );
  const handleOrderDetail = (order: any) => {
    setOrderDetail(order);
    onOpen();
  };

  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        return <h1>{info.getValue()}</h1>;
      },
      header: "ID sản phẩm",
    }),
    columnHelper.accessor("name", {
      cell: (info) => {
        return <h1>{info.getValue()}</h1>;
      },
      header: "Tên sản phẩm",
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue()?.toLocaleString(),
      header: "Đơn giá",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => info.getValue(),
      header: "Số lượng",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("", {
      cell: (info) =>
        (
          info.row.original.price * info.row.original.quantity
        )?.toLocaleString(),
      header: "Thành tiền",
    }),
  ];
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
  const onSubmitForm = (data: any) => {
    console.log(data);
  };
  const handleCancel = () => {
    if (orderDetail?.status !== "processing") {
      return toast({
        title: "Hệ thống",
        description: "Bạn không thể huỷ đơn hàng",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
    cancelOrder({ id: orderDetail._id })
      .unwrap()
      .then((data: any) => {
        toast({
          title: "Hệ thống",
          description: "Huỷ đơn hàng thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch((error: any) => {
        toast({
          title: "Hệ thống",
          description: "Huỷ đơn hàng thất bại",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .finally(() => {
        onCloseCancel();
      });
  };
  return (
    <>
      <TabPanel>
        {status == "all"
          ? data?.data.map((order: any) => (
              <Box
                key={order._id}
                p="6"
                my={4}
                rounded="md"
                backgroundColor="bg.gray"
                onClick={() => handleOrderDetail(order)}
                cursor="pointer"
              >
                <Flex justifyContent="space-between">
                  <Text fontSize="14px" fontWeight={"bold"}>
                    Mã đơn hàng:{order._id}
                    <Text as={"span"} fontSize="14px">
                      {order.id}
                    </Text>
                  </Text>
                  <Tag
                    fontSize="12px"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                    color={"text.red"}
                  >
                    {order.status}
                  </Tag>
                </Flex>
                <Divider />
                <Box>
                  <ItemCart product={order?.new_order_details[0]} />
                </Box>
                <Divider />
                <Flex justifyContent="end">
                  <Text fontSize="14px" fontWeight="bold">
                    Thành tiền:{order.total_amount.toLocaleString()}đ
                  </Text>
                </Flex>
              </Box>
            ))
          : filteredOrders.map((order: any) => (
              <Box
                key={order._id}
                p="6"
                my={4}
                rounded="md"
                backgroundColor="bg.gray"
                cursor="pointer"
                onClick={() => handleOrderDetail(order)}
              >
                <Flex justifyContent="space-between">
                  <Text fontSize="14px" fontWeight={"bold"}>
                    Mã đơn hàng:{" "}
                    <Text as={"span"} fontSize="14px">
                      {order._id}
                    </Text>
                  </Text>
                  <Tag
                    fontSize="12px"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                    color={"text.red"}
                  >
                    {order.status}
                  </Tag>
                </Flex>
                <Divider />
                <Box>
                  <ItemCart product={order?.new_order_details[0]} />
                </Box>
                <Divider />
                <Flex justifyContent="end">
                  <Text fontSize="14px" fontWeight="bold">
                    Thành tiền:{order.total_amount.toLocaleString()}đ
                  </Text>
                </Flex>
              </Box>
            ))}
      </TabPanel>
      <DialogThinkPro
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="4xl"
        title={<Heading fontSize="xl">Chi tiết đơn hàng của bạn</Heading>}
      >
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Box
            backgroundColor={"white"}
            borderRadius={"md"}
            w={{ md: "100%", base: "full" }}
          >
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
                  defaultValue={orderDetail?.customer_name}
                  {...register("customer_name", {
                    required: "Trường bắt buộc nhập",
                  })}
                />
                <FormErrorMessage>
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
                  defaultValue={orderDetail?.phone_number}
                  {...register("phone_number", {
                    required: "Trường bắt buộc nhập",
                  })}
                />
                <FormErrorMessage>
                  {(errors.phone_number as any) &&
                    (errors?.phone_number?.message as any)}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex gap={"16px"}>
              <Box w={"50%"}>
                <Text>Trạng thái thanh toán</Text>
                <Input
                  type="text"
                  border={"none"}
                  p={"8px 12px"}
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  defaultValue={
                    orderDetail?.payment_status == "paid"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"
                  }
                  isReadOnly
                />
              </Box>
              <Box w={"50%"}>
                <Text>Phương thức thanh toán</Text>
                <Input
                  type="text"
                  border={"none"}
                  p={"8px 12px"}
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  defaultValue={orderDetail?.payment_method?.orderInfo}
                  isReadOnly
                />
              </Box>
            </Flex>

            {/* khu vực và địa chỉ nhận hàng */}
            {orderDetail?.shipping_method !== "at_store" && (
              <Flex gap={"16px"} mt={"16px"}>
                <FormControl>
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
                    onClick={onOpenTransport}
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
                      {...register("shipping_address")}
                      value={address}
                      // defaultValue={}
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
                <FormControl>
                  <FormLabel>Địa chỉ nhận hàng</FormLabel>
                  <Input
                    type="text"
                    border={"none"}
                    p={"8px 12px"}
                    placeholder="Địa chỉ nhận hàng"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("address")}
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

            <Flex mt={"16px"}>
              <FormControl isInvalid={errors?.content as any}>
                <FormLabel>Ghi chú</FormLabel>
                <Textarea
                  placeholder="Nhập ghi chú"
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  defaultValue={orderDetail?.content}
                  {...register("content")}
                  border={"none"}
                />
              </FormControl>
            </Flex>
            {/* trạng thái đơn hàng */}
            <Box>
              <Text>Trạng thái đơn hàng</Text>
              <Input
                type="text"
                border={"none"}
                p={"8px 12px"}
                bg={"#F6F9FC"}
                borderRadius={"6px"}
                fontSize={"14px"}
                defaultValue={orderDetail?.status}
                isReadOnly
              />
            </Box>

            {/* table product */}
            <Box>
              <Text fontSize="14px" fontWeight="semibold" my={4}>
                Danh sách sản phẩm
              </Text>
              <TableProduct
                data={orderDetail?.new_order_details}
                columns={columns}
              />
              <Text fontSize="14px" fontWeight="semibold" my={4}>
                Tổng tiền :{" "}
                {(orderDetail?.total_amount + transportFee).toLocaleString()}đ
              </Text>
            </Box>
          </Box>
          <Flex py={"5"} px={"5"} justifyContent="flex-end" gap={6}>
            <Button
              w={"15%"}
              fontSize={"16px"}
              fontWeight={"600 "}
              _hover={{ bgColor: "red" }}
              type="button"
              onClick={onOpenCancel}
            >
              Huỷ đơn
            </Button>
            <Button
              w={"15%"}
              fontSize={"16px"}
              fontWeight={"600 "}
              bg={"bg.green"}
              type="submit"
              _hover={{ bgColor: "green" }}
            >
              Cập nhật
            </Button>
          </Flex>
        </form>
        <Transport
          isOpen={isOpenTransport}
          onOpen={onOpenTransport}
          onClose={onCloseTransport}
          handleChooseAdress={handleChooseAdress}
        />
        <ConfirmThinkPro
          isOpen={isOpenCancel}
          handleClick={handleCancel}
          onClose={onCloseCancel}
          content="Bạn có chắc muốn huỷ đơn hàng này?"
        />
      </DialogThinkPro>
    </>
  );
};

export default TabPanelItem;

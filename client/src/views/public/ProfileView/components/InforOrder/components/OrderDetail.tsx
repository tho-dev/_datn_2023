import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Textarea,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { chuyenDoiSoDienThoai, chuyenDoiSoDienThoaiVe0 } from "~/utils/fc";
import { NavArrowRightIcon } from "~/components/common/Icons";
import { createColumnHelper } from "@tanstack/react-table";
import TableProduct from "~/views/private/OrderManagementView/childrenViews/TableProduct";
import Transport from "~/views/public/PaymentView/components/Transport";
import axios from "axios";
import { useUpdateinfoCustomerMutation } from "~/redux/api/order";

type Props = {
  orderDetail: any;
  onCloseDetail: () => void;
};

const OrderDetail = ({ orderDetail, onCloseDetail }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateinfoCustomer, { isLoading }] = useUpdateinfoCustomerMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transportFee, setTransportFee] = useState(0);
  const [address, setAddress] = React.useState("");
  const columnHelper = createColumnHelper<any>();
  const toast = useToast();

  const onSubmitForm = (data: any) => {
    if (orderDetail.status !== "processing") {
      return toast({
        duration: 1600,
        position: "top-right",
        status: "warning",
        title: `Không thể cập nhật đơn hàng đã ${orderDetail.status}`,
      });
    }
    const phone_number = chuyenDoiSoDienThoai(data.phone_number);
    const shipping_address = data.address + "," + data.shipping_address;
    if (!phone_number) {
      alert("Số điện thoại không hợp lệ");
      return;
    }
    const new_data = {
      ...data,
      id: orderDetail._id,
      phone_number,
      shipping_address: shipping_address,
      transportation_fee: transportFee,
    };

    updateinfoCustomer(new_data)
      .unwrap()
      .then((data: any) => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "success",
          title: data.message,
        });
      })
      .catch((error) => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "error",
          title: error.data.errors.message,
        });
      })
      .finally(() => {
        onCloseDetail();
      });
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
  useEffect(() => {
    if (orderDetail) {
      const new_data = {
        ...orderDetail,
        phone_number: chuyenDoiSoDienThoaiVe0(orderDetail?.phone_number),
      };
      reset(new_data);
    }
  }, [orderDetail, reset]);

  useEffect(() => {
    if (orderDetail && orderDetail.shipping_method == "shipped") {
      const address = orderDetail?.shipping_info?.shipping_address.split(",");
      const [address_detail, ...rest] = address;
      console.log(address_detail);
      setAddress(rest.join(","));
      setTransportFee(orderDetail?.shipping_info?.transportation_fee);
    }
  }, [orderDetail]);

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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAddress("");
    }
  };
  return (
    <Box>
      <Box>
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
                  {...register("customer_name", {
                    required: "Trường bắt buộc nhập",
                  })}
                  defaultValue={orderDetail?.customer_name}
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
            <Flex gap={"16px"}></Flex>

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
                      {...register("shipping_address")}
                      defaultValue={address}
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
                    defaultValue={
                      orderDetail?.shipping_info?.shipping_address.split(",")[0]
                    }
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
                  {...register("content")}
                  border={"none"}
                  defaultValue={orderDetail?.content}
                />
              </FormControl>
            </Flex>
            {/* trạng thái đơn hàng */}

            {/* table product */}
          </Box>
          <Flex py={"5"} px={"5"} justifyContent="flex-end" gap={6}>
            <Button
              w={"15%"}
              fontSize={"16px"}
              fontWeight={"600 "}
              bg={"bg.green"}
              _hover={{ bgColor: "green" }}
              type="submit"
              loadingText="Đang cập nhật..."
              isLoading={isLoading}
            >
              Cập nhật
            </Button>
          </Flex>
        </form>
      </Box>

      <Box>
        <Box>
          <Text fontSize="14px" fontWeight="semibold" my={4}>
            Danh sách sản phẩm
          </Text>
          <TableProduct
            data={orderDetail?.new_order_details}
            columns={columns}
          />
          <Text fontSize="14px" fontWeight="semibold" my={4}>
            Tiền vận chuyển : {transportFee.toLocaleString()}đ
          </Text>
          <Text fontSize="14px" fontWeight="semibold" my={4}>
            Tiền sản phẩm : {orderDetail?.total_amount.toLocaleString()}đ
          </Text>
          <Text fontSize="14px" fontWeight="semibold" my={4}>
            Tổng tiền :{" "}
            {(orderDetail?.total_amount + transportFee).toLocaleString()}đ
          </Text>
        </Box>
      </Box>
      <Transport
        handleChooseAdress={handleChooseAdress}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default OrderDetail;

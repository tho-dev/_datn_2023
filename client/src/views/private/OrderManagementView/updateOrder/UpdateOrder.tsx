import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { NavArrowRightIcon } from "~/components/common/Icons";
import {
  useGetOneShippingQuery,
  useUpdateStatusOrderMutation,
  useUpdateinfoCustomerMutation,
} from "~/redux/api/order";
import Transport from "~/views/public/PaymentView/components/Transport";
import TableProduct from "../childrenViews/TableProduct";
import { createColumnHelper } from "@tanstack/react-table";
import { error } from "console";

type Props = {};
const shopAdress =
  "13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam";
const UpdateOrder = (props: Props) => {
  const toast = useToast();
  const [UpdateOrder] = useUpdateinfoCustomerMutation();
  const [UpdateStatus] = useUpdateStatusOrderMutation();
  const { id } = useParams();
  const listOrderStatus: any[] = [
    "processing",
    "confirmed",
    "delivering",
    "cancelled",
    "delivered",
    "returned",
  ];
  const { register, handleSubmit, watch } = useForm();
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),

    columnHelper.accessor("sku_id", {
      cell: (info) => {
        return <h1>{info.getValue()?._id ?? "id"}</h1>;
      },
      header: "ID sản phẩm",
    }),
    columnHelper.accessor("sku_id", {
      cell: (info) => {
        return <h1>{info.getValue()?.name ?? "Sản phẩm"}</h1>;
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
    columnHelper.accessor("#", {
      cell: (info) =>
        (
          info.row.original.price * info.row.original.quantity
        )?.toLocaleString(),
      header: "Thành tiền",
    }),
  ];
  const { data, isLoading, isFetching, isError } = useGetOneShippingQuery({
    id,
  });
  console.log(data?.data);
  const [dataOrder, setDataOrder] = React.useState({} as any);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = React.useState("");
  const [transportFee, setTransportFee] = React.useState(0);
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
    if (addressWatch && data?.data.shipping_method == "shipped") {
      axios
        .post(`${process.env.VITE_API_URL}/order/calculateFee`, {
          location: addressWatch,
        })
        .then(({ data }) => {
          setTransportFee(data.data);
        });
    }
  }, [addressWatch]);
  // const total_money = 0;
  // const totalMoney = (shipMoney: number) => {

  //   return total_money = data?.data.total_amount
  // };
  const submitForm = (order_infor: any) => {
    const new_data = {
      ...order_infor,
      id: data?.data._id,
      // payment_method: data?.data.payment_method,
      // total_amount: data?.data.total_amount,
      // payment_status: data?.data.payment_status,
      // shop_address: data?.data.shop_address,
      // products: data?.data.products,
      status: listOrderStatus[Number(order_infor.status)],
      // total_amount: data.data.total_money + transportFee,
    };
    const new_status = {
      // ...order_infor,
      id: data?.data._id,
      // payment_method: data?.data.payment_method,
      // total_amount: data?.data.total_amount,
      // payment_status: data?.data.payment_status,
      // shop_address: data?.data.shop_address,
      // products: data?.data.products,
      status: listOrderStatus[Number(order_infor.status)],
      // total_amount: data.data.total_money + transportFee,
    };
    console.log(new_data);
    setDataOrder(new_data);
    UpdateStatus(new_status).unwrap()
      .then((data) => console.log(data))
      .catch((errors) =>
        toast({
          title: "Thất bại",
          duration: 1600,
          position: "top-right",
          status: "error",
          description: errors.error.message,
        })
      );
    UpdateOrder(new_data).then((data) =>
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Cập nhật đơn hàng thành công!",
      })
    );
  };

  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Heading as="h2" fontSize="18" fontWeight={"600"} pb={"20px"}>
        Cập nhật đơn hàng: {data?.data._id}
      </Heading>
      <form action="" onSubmit={handleSubmit(submitForm)}>
        <Flex>
          <Box w={"70%"}>
            <Flex gap={"16px"}>
              <FormControl>
                <FormLabel>Tên người nhận</FormLabel>
                <Input
                  type="text"
                  placeholder="Nhập họ và tên"
                  border={"none"}
                  p={"8px 12px"}
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  {...register("customer_name")}
                  defaultValue={data?.data.customer_name}
                />
                {/* <FormErrorMessage>
                  {" "}
                  {(errors.customer_name as any) &&
                    (errors?.customer_name?.message as any)}
                </FormErrorMessage> */}
              </FormControl>
              <FormControl>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  type="number"
                  border={"none"}
                  p={"8px 12px"}
                  placeholder="Nhập số điện thoại"
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  // {...register("phone_number", {
                  //   required: "Trường bắt buộc nhập",
                  // })}
                  defaultValue={data?.data.phone_number}
                  disabled
                />
                {/* <FormErrorMessage>
                  {" "}
                  {(errors.phone_number as any) &&
                    (errors?.phone_number?.message as any)}
                </FormErrorMessage> */}
              </FormControl>
            </Flex>
            <Flex gap={"16px"}>
              <FormControl>
                <FormLabel>Trạng thái đơn hàng</FormLabel>
                {data?.data.status && (
                  <Select
                    border={"none"}
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    placeholder="Trạng thái đơn hàng"
                    {...register("status")}
                    defaultValue={listOrderStatus.findIndex(
                      (item: any) => item == data?.data?.status
                    )}
                  >
                    {listOrderStatus.map((item: any, index) => {
                      return (
                        <option key={index} value={index}>
                          {item}
                        </option>
                      );
                    })}
                  </Select>
                )}
              </FormControl>
            </Flex>
            {data?.data.shipping_method == "shipped" && (
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
                      {...register("shipping_address", {
                        required: "Trường bắt buộc nhập",
                      })}
                      value={address}
                      onClick={handleChooseAdress}
                      defaultValue={data?.data.shipping_info.shipping_address}
                    />
                    <NavArrowRightIcon
                      size={4}
                      strokeWidth={2}
                      color="text.black"
                    />
                  </Box>
                  {/* <FormErrorMessage>
                    {(errors?.shipping_address as any) &&
                      (errors?.shipping_address?.message as any)}
                  </FormErrorMessage> */}
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
                    {...register("address", {
                      required: "Trường bắt buộc nhập",
                    })}
                    defaultValue={data?.data.shipping_info.shipping_address}
                  />
                  {/* <FormErrorMessage>
                    {(errors?.address as any) &&
                      (errors?.address?.message as any)}
                  </FormErrorMessage> */}
                  <FormHelperText fontSize="12px" fontWeight="semibold">
                    Có thể là số nhà, tên đường, tòa nhà. VD: Số 53 Thái Hà
                  </FormHelperText>
                </FormControl>
              </Flex>
            )}

            <Flex mt={"16px"}>
              <FormControl>
                <FormLabel>Ghi chú</FormLabel>
                <Textarea
                  placeholder="Nhập ghi chú"
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  {...register("content")}
                  border={"none"}
                  defaultValue={data?.data.content}
                />
              </FormControl>
            </Flex>
          </Box>
          <Box pl="5" pt={"7"} bgColor="bg.white" rounded="md">
            {data?.data.products && (
              <Box>
                <TableProduct columns={columns} data={data?.data.products} />
                <Flex alignItems="flex-end" flexDirection="column" py={4}>
                  <Box width="30%" minH="250px">
                    <Flex
                      my={1}
                      justifyContent="space-between"
                      p={2}
                      borderBottom="1px solid #ccc"
                    >
                      <Text fontSize={16} fontWeight="semibold">
                        Tổng số lượng:{" "}
                      </Text>
                      <Text>
                        {data.data.products.reduce(
                          (acc: any, product: any) => acc + product.quantity,
                          0
                        )}
                      </Text>
                    </Flex>
                    <Flex
                      my={1}
                      justifyContent="space-between"
                      p={2}
                      borderBottom="1px solid #ccc"
                    >
                      <Text fontSize={16} fontWeight="semibold">
                        Tổng Tiền:{" "}
                      </Text>
                      <Text>{data?.data.total_amount.toLocaleString()}</Text>
                    </Flex>
                    <Flex
                      my={1}
                      justifyContent="space-between"
                      p={2}
                      borderBottom="1px solid #ccc"
                    >
                      <Text fontSize={16} fontWeight="semibold">
                        Giảm Giá:{" "}
                      </Text>
                      <Text>0</Text>
                    </Flex>
                    <Flex
                      my={1}
                      justifyContent="space-between"
                      p={2}
                      borderBottom="1px solid #ccc"
                    >
                      <Text fontSize={16} fontWeight="bold">
                        Thành tiền:{" "}
                      </Text>
                      <Text>{data?.data.total_amount.toLocaleString()}</Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
        <Box mt={"20px"} justifyContent={"end"} display={"flex"}>
          {" "}
          <Button type="submit">Cập Nhật</Button>
        </Box>
      </form>

      {/* <PopupCheckOtp
        isOpenOtp={isOpenOtp}
        onOpenOtp={onOpenOtp}
        onCloseOtp={onCloseOtp}
        dataOrder={dataOrder}
      /> */}
      <Transport
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleChooseAdress={handleChooseAdress}
      />
    </Box>
  );
};

export default UpdateOrder;

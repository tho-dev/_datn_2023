import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { CartIcon, NavArrowRightIcon } from "~/components/common/Icons";
import {
  useDecrementProductMutation,
  useGetOneQuery,
  useIncrementProductMutation,
  useUpdateinfoCustomerMutation,
} from "~/redux/api/order";
import Transport from "~/views/public/PaymentView/components/Transport";
import CartItem from "./components/CartItem";
import { chuyenDoiSoDienThoai, chuyenDoiSoDienThoaiVe0 } from "~/utils/fc";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import LoadingPolytech from "~/components/LoadingPolytech";

const UpdateOrder = () => {
  const toast = useToast();
  const { id } = useParams();
  const { data, isLoading } = useGetOneQuery(id);

  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const navigate = useNavigate();

  const [address, setAddress] = React.useState("");
  const [transportFee, setTransportFee] = useState(0);
  const [dataUser, setDataUser] = useState({} as any);
  // api
  const [updateinfoCustomer] = useUpdateinfoCustomerMutation();
  const [decrementProduct] = useDecrementProductMutation();
  const [incrementProduct] = useIncrementProductMutation();

  const submitForm = (order_infor: any) => {
    const phone_number = chuyenDoiSoDienThoai(order_infor.phone_number);
    const shipping_address =
      order_infor.address_detail + "," + order_infor.shipping_address;
    if (!phone_number) {
      alert("Số điện thoại không hợp lệ");
      return;
    }
    const new_data = {
      id: id,
      ...order_infor,
      phone_number,
      shipping_address: shipping_address,
      transportation_fee: transportFee,
    };
    if (data?.data.status !== "processing") {
      return toast({
        title: "Hệ thống thông báo",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: `Không thể cập nhật đơn hàng đã ${data?.data?.status}`,
      });
    }
    setDataUser(new_data);
    onOpenUpdate();
  };
  const handleUpdateCustomer = () => {
    updateinfoCustomer(dataUser)
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "top-right",
          status: "success",
          description: data.message,
        });
      })
      .catch((error) => {
        toast({
          title: "Thất bại",
          duration: 1600,
          position: "top-right",
          status: "error",
          description: error.data.errors.message,
        });
      })
      .finally(() => {
        onCloseUpdate();
        navigate("/admin/don-hang");
      });
  };
  const handleIncrementProduct = (sku_id: any) => {
    if (data?.data.status !== "processing") {
      return toast({
        title: "Hệ thống thông báo",
        duration: 1600,
        position: "bottom-right",
        status: "error",
        description: `Không thể cập nhật đơn hàng ${data?.data.status}`,
      });
    }
    incrementProduct({ order_id: id, sku_id: sku_id })
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "bottom-right",
          status: "success",
          description: data.message,
        });
      })
      .catch((error) => {
        toast({
          title: "Thất bại",
          duration: 1600,
          position: "bottom-right",
          status: "error",
          description: error.data.errors.message,
        });
      });
  };
  const handleDecrementProduct = (sku_id: any) => {
    if (data?.data.status !== "processing") {
      return toast({
        title: "Hệ thống thông báo",
        duration: 1600,
        position: "bottom-right",
        status: "error",
        description: `Không thể cập nhật đơn hàng ${data?.data.status}`,
      });
    }
    decrementProduct({ order_id: id, sku_id: sku_id })
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "bottom-right",
          status: "success",
          description: data.message,
        });
      })
      .catch((error) => {
        toast({
          title: "Thất bại",
          duration: 1600,
          position: "bottom-right",
          status: "error",
          description: error.data.errors.message,
        });
      });
  };
  useEffect(() => {
    if (data && data?.data.shipping_method == "shipped") {
      const address = data?.data?.shipping_info?.shipping_address.split(",");
      const [address_detail, ...rest] = address;
      console.log(address_detail);
      setAddress(rest.join(","));
      setTransportFee(data?.data?.shipping_info?.transportation_fee);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingPolytech />;
  }

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
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="xl">
      <Heading
        as="h2"
        fontSize="18"
        fontWeight={"bold"}
        textTransform="uppercase"
        mb="8"
      >
        Cập nhật đơn hàng: #{id}
      </Heading>
      <Grid gridTemplateColumns="repeat(2,1fr)" gap={4}>
        <GridItem>
          <form action="" onSubmit={handleSubmit(submitForm)}>
            <Box
              py="8"
              px="6"
              rounded="xl"
              borderWidth="1px"
              borderColor="#eef1f6"
              boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
            >
              <Heading mb="4" fontSize="md" fontWeight="bold">
                ✔ Thông tin chung
              </Heading>
              <Flex gap={"16px"}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Tên người nhận
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Nhập họ và tên"
                    border={"none"}
                    p={"8px 12px"}
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("customer_name")}
                    defaultValue={data?.data?.customer_name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    SĐT
                  </FormLabel>
                  <Input
                    type="string"
                    border={"none"}
                    p={"8px 12px"}
                    placeholder="Nhập số điện thoại"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("phone_number", {
                      required: "Trường bắt buộc nhập",
                    })}
                    defaultValue={chuyenDoiSoDienThoaiVe0(
                      data?.data?.phone_number
                    )}
                  />
                </FormControl>
              </Flex>
              {data?.data?.shipping_method == "shipped" && (
                <Flex gap={"16px"} mt={"16px"}>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Khu Vực
                    </FormLabel>
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
                        defaultValue={
                          data?.data?.shipping_info?.shipping_address
                        }
                      />
                      <NavArrowRightIcon
                        size={4}
                        strokeWidth={2}
                        color="text.black"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Địa chỉ nhận hàng
                    </FormLabel>
                    <Input
                      type="text"
                      border={"none"}
                      p={"8px 12px"}
                      placeholder="Địa chỉ nhận hàng"
                      bg={"#F6F9FC"}
                      borderRadius={"6px"}
                      fontSize={"14px"}
                      {...register("address_detail", {
                        required: "Trường bắt buộc nhập",
                      })}
                      defaultValue={
                        data?.data?.shipping_info?.shipping_address.split(
                          ","
                        )[0]
                      }
                    />

                    <FormHelperText fontSize="12px" fontWeight="semibold">
                      Có thể là số nhà, tên đường, tòa nhà. VD: Số 53 Thái Hà
                    </FormHelperText>
                  </FormControl>
                </Flex>
              )}

              <Flex mt={"16px"}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Ghi chú
                  </FormLabel>
                  <Textarea
                    placeholder="Nhập ghi chú"
                    bg={"#F6F9FC"}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                    {...register("content")}
                    border={"none"}
                    defaultValue={data?.data?.content}
                  />
                </FormControl>
              </Flex>
              <Box mt={"20px"} justifyContent={"end"} display={"flex"}>
                <Button type="submit" bg="bg.bgEdit" color="text.textEdit">
                  Cập Nhật
                </Button>
              </Box>
            </Box>
          </form>
        </GridItem>
        <GridItem>
          <Box
            py="8"
            px="6"
            rounded="xl"
            borderWidth="1px"
            borderColor="#eef1f6"
            boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
          >
            <Heading mb="4" fontSize="md" fontWeight="bold">
              ✔ Sản phẩm
            </Heading>
            {data?.data?.products.map((item: any) => {
              return (
                <CartItem
                  item={item}
                  handleIncrementProduct={handleIncrementProduct}
                  handleDecrementProduct={handleDecrementProduct}
                  key={item._id}
                />
              );
            })}
          </Box>
          <Box
            my={8}
            py="8"
            px="6"
            rounded="xl"
            borderWidth="1px"
            borderColor="#eef1f6"
            boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
          >
            <Heading mb="4" fontSize="md" fontWeight="bold">
              ✔ Tổng tiền
            </Heading>
            <Flex
              justifyContent="flex-end"
              gap="20px"
              alignItems="center"
              my={4}
            >
              <Text fontSize="14px" fontWeight="semibold">
                Tổng tiền hàng:
              </Text>
              <Text fontSize="14px" fontWeight="semibold">
                {data?.data?.products
                  .reduce(
                    (accumulator: any, currentValue: any) =>
                      accumulator + currentValue.total_money,
                    0
                  )
                  .toLocaleString()}
                đ
              </Text>
            </Flex>
            <Flex
              justifyContent="flex-end"
              gap="20px"
              alignItems="center"
              my={4}
            >
              <Text fontSize="14px" fontWeight="semibold">
                Tiền ship:
              </Text>
              <Text fontSize="14px" fontWeight="semibold">
                {data?.data.shipping_method === "shipped"
                  ? transportFee.toLocaleString()
                  : 0}
                đ
              </Text>
            </Flex>
            <Divider />
            <Flex
              justifyContent="flex-end"
              gap="20px"
              alignItems="center"
              my={4}
            >
              <Text fontSize="14px" fontWeight="semibold">
                Tổng hoá đơn
              </Text>
              <Text fontSize="14px" fontWeight="semibold">
                {(data?.data?.total_amount + transportFee).toLocaleString()}đ
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
      <Transport
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleChooseAdress={handleChooseAdress}
      />
      <ConfirmThinkPro
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        handleClick={handleUpdateCustomer}
        content="Bạn có chắc chắn muốn cập nhật đơn hàng này"
        icon={<CartIcon />}
      />
    </Box>
  );
};

export default UpdateOrder;

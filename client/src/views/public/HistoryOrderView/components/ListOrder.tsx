import { Grid, Heading } from "@chakra-ui/layout";
import {
  Box,
  Divider,
  Flex,
  Text,
  Tag,
  GridItem,
  Image,
  IconButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { NavArrowLeflIcon } from "~/components/common/Icons/index";
import DialogThinkPro from "~/components/DialogThinkPro";
import DetailOrder from "./DetailOrder";
import { useState } from "react";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import {
  useCancelOrderMutation,
  useReturnOrderMutation,
} from "~/redux/api/order";
import moment from "moment";
import { useForm } from "react-hook-form";

type Props = {
  dataOrder: any[];
  phoneNumber: any;
};

const ListOrder = ({ dataOrder, phoneNumber }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenReturn,
    onOpen: onOpenReturn,
    onClose: onCloseReturn,
  } = useDisclosure();

  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [orderDetail, setOrderDetail] = useState({} as any);
  const toast = useToast();
  const handleGetOrderDetail = (item: any) => {
    setOrderDetail(item);
    onOpen();
  };
  const [cancelOrder] = useCancelOrderMutation();
  const [returnOrder] = useReturnOrderMutation();
  const handleOpenModelReturn = (order: any, e: any) => {
    e.stopPropagation();
    onOpenReturn();
    setOrderDetail(order);
  };

  const handleCancel = () => {
    const currentDate = new Date();
    const targetTime = new Date(orderDetail.created_at);
    targetTime.setMinutes(targetTime.getMinutes() + 15);
    if (currentDate > targetTime) {
      return toast({
        title: "Không thể huỷ đơn hàng",
        description: "Liên hệ với bộ phận CSKH để được xử lý",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
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
  const handleOpenModelCancel = (order: any, e: any) => {
    e.stopPropagation();
    onOpenCancel();
    setOrderDetail(order);
  };
  const onSubmitFormReturn = (data: any) => {
    const new_data = {
      ...data,
      order_id: orderDetail._id,
    };
    returnOrder(new_data)
      .unwrap()
      .then((data) => {
        toast({
          title: "Hệ thống",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Hệ thống",
          description: err.data.errors.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .finally(() => {
        onCloseReturn();
      });
  };
  return (
    <Box p="4" rounded="md">
      <Flex justifyContent="space-between">
        <Heading py="4" color="text.black" fontSize="xl">
          Đơn hàng của bạn : {phoneNumber}
        </Heading>
      </Flex>

      <Grid gridTemplateColumns="repeat(3,1fr)" gap={4} w="100%">
        {dataOrder.length > 0 ? (
          dataOrder.map((item) => {
            return (
              <GridItem>
                <Box
                  p="4"
                  my={4}
                  rounded="md"
                  backgroundColor="bg.white"
                  cursor={"pointer"}
                  onClick={() => handleGetOrderDetail(item)}
                  minH={250}
                >
                  <Flex justifyContent="space-between">
                    <Text fontSize="14px" fontWeight={"bold"}>
                      Mã đơn hàng:{" "}
                      <Text as={"span"} fontSize="12px">
                        POLYTECH{item?._id}
                      </Text>
                    </Text>
                    <Tag
                      fontSize="10px"
                      fontWeight="bold"
                      textTransform={"uppercase"}
                      color={"text.red"}
                    >
                      {item?.status}
                    </Tag>
                  </Flex>
                  <Divider />
                  <Box>
                    <Flex
                      justifyContent={"space-between"}
                      my={"4"}
                      alignItems="center"
                    >
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        w={"100%"}
                      >
                        <Box>
                          <Text as={"p"} fontSize={"14px"} fontWeight={"bold"}>
                            Tên khách hàng : {item?.customer_name}
                          </Text>
                          <Text
                            as={"p"}
                            fontSize={"12px"}
                            fontWeight={"semibold"}
                          >
                            Ngày đặt :{" "}
                            {moment(item?.created_at).format(
                              "DD-MM-YYYY hh:mm"
                            )}
                          </Text>
                          <Text
                            as={"p"}
                            fontSize={"12px"}
                            fontWeight={"semibold"}
                          >
                            Thanh toán :{" "}
                            {item?.payment_status == "unpaid"
                              ? "Chưa thanh toán "
                              : "Đã thanh toán"}
                          </Text>
                          <Box>
                            <Text
                              as={"p"}
                              fontSize={"12px"}
                              my={"2"}
                              fontWeight={"semibold"}
                            >
                              Ghi chú :{" "}
                              {item?.content.length > 0
                                ? item.content
                                : "Không có ghi chú"}
                            </Text>
                          </Box>
                        </Box>
                        <Box>
                          <Text fontSize={"40px"} fontWeight={"bold"}>
                            {item?.orders.length}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                  <Divider />

                  <Flex justifyContent="space-between" alignItems={"center"}>
                    <Flex gap={2} my={2}>
                      {item.status == "processing" && (
                        <Button
                          fontWeight={"600"}
                          fontSize={"12px"}
                          _hover={{ bgColor: "red" }}
                          type="button"
                          onClick={(e) => handleOpenModelCancel(item, e)}
                          size={"sm"}
                        >
                          Huỷ đơn
                        </Button>
                      )}
                      {item.status == "delivered" && (
                        <Button
                          size={"sm"}
                          fontSize={"12px"}
                          fontWeight={"600 "}
                          bg={"bg.green"}
                          _hover={{ bgColor: "green" }}
                          onClick={(e) => handleOpenModelReturn(item, e)}
                        >
                          Hoàn hàng
                        </Button>
                      )}
                    </Flex>

                    <Text fontSize="14px" fontWeight="bold">
                      Thành tiền:{" "}
                      <Text
                        as={"span"}
                        fontSize="14px"
                        fontWeight={"bold"}
                        color={"text.red"}
                      >
                        {item?.total_amount.toLocaleString()}đ
                      </Text>
                    </Text>
                  </Flex>
                </Box>
              </GridItem>
            );
          })
        ) : (
          <Box>không có gì</Box>
        )}
      </Grid>
      <DialogThinkPro
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="4xl"
        title={<Heading fontSize="xl">Chi tiết đơn hàng của bạn</Heading>}
      >
        <DetailOrder orderDetail={orderDetail} />
      </DialogThinkPro>
      <ConfirmThinkPro
        isOpen={isOpenCancel}
        handleClick={handleCancel}
        onClose={onCloseCancel}
        content="Bạn có chắc muốn huỷ đơn hàng này?"
      />
      <DialogThinkPro
        isOpen={isOpenReturn}
        onClose={onCloseReturn}
        isCentered
        size="4xl"
        title={<Heading fontSize="xl">Trả lại đơn hàng</Heading>}
      >
        <form onSubmit={handleSubmit(onSubmitFormReturn)}>
          <Box
            backgroundColor={"white"}
            borderRadius={"md"}
            w={{ md: "100%", base: "full" }}
          >
            {/* tên người nhận và số điện thoại */}
            <Flex gap={"16px"}>
              <FormControl isInvalid={errors.customer_name as any}>
                <FormLabel>Tên khách hàng</FormLabel>
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
                  defaultValue={`${orderDetail?.phone_number}`}
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
            <Flex mt={"16px"}>
              <FormControl isInvalid={errors?.reason as any}>
                <FormLabel>Lý do</FormLabel>
                <Textarea
                  placeholder="Nhập Lý do hoàn hàng"
                  bg={"#F6F9FC"}
                  borderRadius={"6px"}
                  fontSize={"14px"}
                  {...register("reason")}
                  border={"none"}
                />
              </FormControl>
            </Flex>
          </Box>
          <Flex py={"5"} px={"5"} justifyContent="flex-end" gap={6}>
            <Button
              w={"15%"}
              fontSize={"16px"}
              fontWeight={"600 "}
              bg={"bg.green"}
              _hover={{ bgColor: "green" }}
              type="submit"
            >
              Hoàn hàng
            </Button>
          </Flex>
        </form>
      </DialogThinkPro>
    </Box>
  );
};

export default ListOrder;

import React from "react";
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { chuyenDoiSoDienThoai } from "~/utils/fc";
import { useReturnOrderMutation } from "~/redux/api/order";

type Props = {
  orderDetail: any;
  id: any;
  onCloseReturn: () => void;
};

const ReturnOrder = ({ orderDetail, id, onCloseReturn }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const [returnOrder] = useReturnOrderMutation();
  const onSubmitFormReturn = (data: any) => {
    const { address, content, shipping_address, phone_number, ...rest } = data;
    // check thời gian
    // const currentDate = new Date();
    // const targetTime = new Date(orderDetail?.updated_at);

    // targetTime.setDate(targetTime.getDate() + 1);
    // if (currentDate > targetTime) {
    //   return toast({
    //     title: "Không thể hoàn đơn hàng",
    //     description: "Liên hệ với bộ phận CSKH để được xử lý",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    // }

    const new_phone_number = chuyenDoiSoDienThoai(phone_number);
    const new_data = {
      ...rest,
      phone_number: new_phone_number,
      order_id: id,
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
    <Box>
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
    </Box>
  );
};

export default ReturnOrder;

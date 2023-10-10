import React, { useEffect, useState } from "react";
import DialogThinkPro from "~/components/DialogThinkPro";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  useCheckOtpMutation,
  useCreateMutation,
  usePaymentMomoMutation,
  useSendOtpMutation,
} from "~/redux/api/order";
import { useNavigate } from "react-router";
import Time from "./Time";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { setCheckOtp } from "~/redux/slices/globalSlice";
type Props = {
  open: any;
  dataOrder: any;
};

const PopupCheckOtp = ({ open, dataOrder }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkOtp] = useCheckOtpMutation();
  const [create] = useCreateMutation();
  const [paymentMomo] = usePaymentMomoMutation();
  const { time, isCheckOtp } = useAppSelector(
    (state) => state.persistedReducer.global
  );
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    open && onOpen();
  }, [open]);

  const navigate = useNavigate();
  const [value, setValue] = React.useState("");

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (value.length < 6) return;
    const { payment_method, ...rest } = dataOrder;

    const checkOTP: any = await checkOtp({
      phone_number: dataOrder?.phone_number,
      code: value,
    });
    if (checkOTP.data.status !== 200) {
      return toast({
        title: "OTP",
        description: "Mã OTP của bạn chưa đúng hoặc nó đã hết hạn",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    const createdOrder: any = await create(dataOrder);
    if (createdOrder.data.status !== 200) {
      return toast({
        title: "Đơn hàng",
        description: "Đơn hàng của bạn đã tạo thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    if (payment_method == "online") {
      const payment_momo: any = await paymentMomo({
        bill: dataOrder.total_amount,
        orderId: createdOrder.data.data._id,
      });
      console.log(payment_momo.data.message);
      if (payment_momo.data.message === "successfully") {
        window.location.assign(`${payment_momo.data.data.url}`);
      }
    } else {
      navigate("/thanks");
    }
    onClose();
  };

  useEffect(() => {
    if (time == 0 && !isCheckOtp && open) {
      console.log("vào đây");
      dispatch(setCheckOtp(60));
      sendOtp({ phone_number: dataOrder.phone_number })
        .then((data) => {
          console.log("vao day nữa");

          toast({
            title: "Thanh Toán",
            description: "Gửi mã OTP thành công",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch((err) => {
          toast({
            title: "Thanh Toán",
            description: "Gửi mã OTP thất bại",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-right",
          });
        });
    }
  }, [open]);

  const handleSendOtp = () => {
    sendOtp({ phone_number: dataOrder.phone_number })
      .then((data) => {
        dispatch(setCheckOtp(60));
        toast({
          title: "Thanh Toán",
          description: "Đã gửi lại mã OTP",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Thanh Toán",
          description: "Gửi lại mã OTP thất bại",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };
  return (
    <DialogThinkPro isOpen={isOpen} onClose={onClose} isCentered>
      <form onSubmit={submitForm}>
        <Flex my={"5"} w={"full"} justifyContent="center" alignItems="center">
          <Flex
            flexDirection="column"
            backgroundColor={"white"}
            borderRadius={"md"}
            p={"24px"}
            mr={"5"}
            w={{ md: "80%", base: "full" }}
            alignItems="center"
            gap={4}
          >
            <Text fontSize={"20px"} fontWeight={600} as={"h3"}>
              Nhập mã OTP
            </Text>
            <Text fontSize={"12px"} fontWeight={"semibold"}>
              Một mã OTP vừa được chúng tôi gửi đến số điện thoại của bạn
            </Text>
            <FormControl w="100%">
              <Flex justifyContent="center" gap={2}>
                <PinInput onChange={(value) => setValue(value)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </Flex>
              <FormErrorMessage>
                {value.length === 0 ? "Mời bạn nhập mã OTP" : ""}
              </FormErrorMessage>
            </FormControl>
            <Time handleSendOtp={handleSendOtp} />
            <Flex gap={4}>
              <Button
                bg={`${value.length < 6 ? "gray.400" : "green.400"}`}
                color={`${value.length < 6 ? "gray.500" : "white"}`}
                mt={"16px"}
                type="submit"
              >
                Xác nhận
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </DialogThinkPro>
  );
};

export default PopupCheckOtp;

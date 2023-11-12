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
import { resetOtp, setCheckOtp } from "~/redux/slices/globalSlice";
import cartApi, {
  useCreateCartMutation,
  useDeleteCartMutation,
} from "~/redux/api/cart";
import { v4 as uuidv4 } from "uuid";
import { addCart } from "~/redux/slices/cartSlice";
import { socket } from "~/App";
import { useAddNotiMutation } from "~/redux/api/notification";
type Props = {
  isOpenOtp: any;
  onOpenOtp: () => void;
  onCloseOtp: () => void;
  dataOrder: any;
};

const PopupCheckOtp = ({
  onOpenOtp,
  isOpenOtp,
  onCloseOtp,
  dataOrder,
}: Props) => {
  const [value, setValue] = React.useState("");

  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);

  const [checkOtp] = useCheckOtpMutation();
  const [create] = useCreateMutation();
  const [paymentMomo] = usePaymentMomoMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [createCart] = useCreateCartMutation();

  const { time, isCheckOtp } = useAppSelector(
    (state) => state.persistedReducer.global
  );
  const [loading, setLoading] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useAppDispatch();
  const [addNoti] = useAddNotiMutation();
  const toast = useToast();

  const navigate = useNavigate();

  const submitForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (value.length < 6) return;
    const { payment_method, ...rest } = dataOrder;
    checkOtp({
      phone_number: dataOrder?.phone_number,
      code: value,
    })
      .unwrap()
      .then(() => {
        create(dataOrder)
          .unwrap()
          .then((data) => {
            // onCloseOtp();
            dispatch(resetOtp(false));
            dispatch(cartApi.util.invalidateTags(["Cart"]));
            addNoti({
              sender_id: null,
              receivers_id: null,
              status: false,
              message: "Một đơn hàng đã được đặt",
              link: "don-hang",
            })
              .unwrap()
              .then((data) => {
                const new_data = { ...data?.data, roomName: "don-hang" };
                socket.emit("sendNotification", new_data);
              });
            if (payment_method == "online") {
              paymentMomo({
                bill: dataOrder.total_amount,
                orderId: data.data._id,
              })
                .unwrap()
                .then((data) => {
                  window.location.assign(`${data.data.url}`);
                });
            } else {
              navigate("/thanks");
            }
          })
          .catch((err) => {
            dispatch(resetOtp(false));
            toast({
              title: "Đơn hàng",
              description: err.data.errors.message,
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "top-right",
            });
          })
          .finally(() => {
            onCloseOtp();
            dispatch(resetOtp(false));
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "OTP",
          description: err.data.errors.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  useEffect(() => {
    if (time == 0 && !isCheckOtp && isOpenOtp) {
      dispatch(setCheckOtp(60));
      sendOtp({ phone_number: dataOrder.phone_number })
        .then((data) => {
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
  }, [isOpenOtp]);

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
  const handleClose = () => {
    if (loading) return;
    onCloseOtp();
  };
  return (
    <DialogThinkPro isOpen={isOpenOtp} onClose={handleClose} isCentered>
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
                isLoading={loading}
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

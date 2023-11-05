import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";

import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { useState } from "react";
import { Image, useToast } from "@chakra-ui/react";
import banner from "~/assets/images/TGDD-540x270-1.png";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { checkPhoneSchema } from "~/validate/order";
import { useAppDispatch } from "~/redux/hook/hook";
import { sendOtpPhone } from "~/redux/slices/orderSlice";
import {
  useGetOrderByPhoneNumberMutation,
  useSendOtpMutation,
} from "~/redux/api/order";
import {
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFailure,
} from "~/redux/slices/orderSlice";

const CheckPhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(checkPhoneSchema),
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPhone, setIphone] = useState<boolean>(false);
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [getOrderByPhoneNumber] = useGetOrderByPhoneNumberMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      phone_number: data.phone_number.replace(/^0/, "+84"),
    };

    const result: any = await sendOtp(payload);
    console.log(result);

    if (result.data?.status === 200) {
      toast({
        title: "Tra cứu thành công",
        description: result.data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      dispatch(getAllOrderStart());

      try {
        const resultOrder: any = await getOrderByPhoneNumber(payload);
        if (resultOrder) {
          console.log(resultOrder);
          dispatch(getAllOrderSuccess(resultOrder));
        }
      } catch (error) {
        dispatch(getAllOrderFailure());
      }

      setIphone(true);
    } else {
      toast({
        title: "Tra cứu thất bại",
        description: result.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    dispatch(sendOtpPhone({ data: data, result: result }));
    // dispatch(resetOtpPhone(result));
  };
  return (
    <Box>
      <Grid gridTemplateColumns="repeat(2,1fr)">
        <GridItem>
          <Box w="100%" height="600px" display="flex" alignItems="center">
            <Image
              src={banner}
              alt="Dan Abramov"
              width="100%"
              objectFit="cover"
            />
          </Box>
        </GridItem>
        <GridItem>
          <form
            style={{
              width: "100%",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Flex
              padding="20px"
              height="500px"
              flexDirection="column"
              bgColor="bg.white"
              borderRadius="6px"
              alignItems="center"
            >
              <FormControl
                isInvalid={errors.phone_number as any}
                margin="20px 0"
                w="70%"
              >
                <FormLabel
                  marginTop="20px"
                  fontSize="18px"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Tra cứu thông tin đơn hàng
                </FormLabel>
                <Input
                  id="phone_number"
                  {...register("phone_number")}
                  type="number"
                  placeholder="Nhập số điện thoại mua hàng"
                  px="0"
                />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {(errors.phone_number as any) &&
                    (errors?.phone_number?.message as any)}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                type="submit"
                bgColor="bg.blue"
                w="70%"
                isLoading={isLoading}
                loadingText={isLoading ? "Đang tra cứu" : ""}
              >
                Tra cứu
              </Button>
            </Flex>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CheckPhone;

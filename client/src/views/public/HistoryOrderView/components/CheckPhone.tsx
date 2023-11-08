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
import { useGetOrderByPhoneNumberMutation } from "~/redux/api/order";
import { chuyenDoiSoDienThoai } from "~/utils/fc";

type Props = {
  setCheckPhone: any;
  handleGetPhoneNumber: (phoneNumber: any) => void;
  setDataOrder: any;
};

const CheckPhone = ({
  setCheckPhone,
  handleGetPhoneNumber,
  setDataOrder,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const toast = useToast();
  const [getOrderByPhoneNumber, { isLoading }] =
    useGetOrderByPhoneNumberMutation();

  const onSubmit = async (data: any) => {
    const phone_number = chuyenDoiSoDienThoai(data.phone_number);
    if (!phone_number) {
      return toast({
        title: "Hệ thống",
        description: "Sai định dạng số điện thoại",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
    getOrderByPhoneNumber({ phone_number: phone_number })
      .unwrap()
      .then(({ data }) => {
        toast({
          title: "Hệ thống",
          description: "Tìm thấy đơn hàng thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        setDataOrder(data);
        setCheckPhone(false);
        handleGetPhoneNumber(phone_number);
      })
      .catch((error) => {
        toast({
          title: "Hệ thống",
          description: error.data.errors.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      });
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
                  px="2"
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
                _hover={{ bgColor: "blue" }}
                w="70%"
                loadingText="Đang tìm kiếm đơn hàng..."
                isLoading={isLoading}
                fontSize={"16px"}
              >
                Tra cứu thông tin
              </Button>
            </Flex>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CheckPhone;

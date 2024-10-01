import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Grid,
  GridItem,
  Divider,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpdatePassWordMutation } from "~/redux/api/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/redux/hook/hook";
import { logout } from "~/redux/slices/globalSlice";

type Props = {
  data: any;
};

const Password = ({ data }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const toast = useToast();
  const [updatePassword] = useUpdatePassWordMutation();

  const handleUpdatePassword = async (dataPassword: any) => {
    setLoading(true);
    const newDataPassWord = {
      ...dataPassword,
      userId: data.userId,
    };
    try {
      await updatePassword(newDataPassWord).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Cập nhật mật khẩu thành công",
      });
    } catch (error: any) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: JSON.stringify(error?.data?.errors),
      });
    }
    reset();
    setLoading(false);
  };
  return (
    <Box
      mt={7}
      w={"100%"}
      bg={"#ffff"}
      borderRadius={"6px"}
      p={5}
      fontSize={14}
    >
      <Text fontSize={16} fontWeight={700} mb={5}>
        Thay đổi mật khẩu
      </Text>
      <Divider />
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Mật khẩu hiện tại
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.oldPassword as any}>
              <Input
                type="password"
                // id="password"
                placeholder="Enter current address"
                size="lager"
                {...register("oldPassword", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.oldPassword as any) && errors?.oldPassword?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Mật khẩu mới
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.password as any}>
              <Input
                type="password"
                // id="password"
                placeholder="Enter new password"
                size="lager"
                {...register("password", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.password as any) && errors?.password?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Xác nhận mật khẩu mới
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.confirmPassword as any}>
              <Input
                type="password"
                // id="password"
                placeholder="Confirm your new password"
                size="lager"
                {...register("confirmPassword", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.confirmPassword as any) &&
                  errors?.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
          isLoading={loading}
        >
          Lưu thay đổi
        </Button>
      </form>
    </Box>
  );
};

export default Password;

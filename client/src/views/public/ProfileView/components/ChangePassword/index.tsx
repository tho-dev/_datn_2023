import { Divider, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { CheckedIcon, CloseSmallIcon } from "~/components/common/Icons";
import { useUpdatePassWordMutation } from "~/redux/api/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/redux/hook/hook";
import { logout } from "~/redux/slices/globalSlice";

type Props = {
  user: any;
};

const ChangePassword = ({ user }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [updatePassWord] = useUpdatePassWordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data.new_password !== data.confirm_password) {
      toast({
        title: "Hệ thống thông báo",
        description: "Mật khẩu mới không trùng khớp",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    updatePassWord({
      id: user._id,
      password: data.password,
      new_password: data.new_password,
      new_confirm_password: data.confirm_password,
    })
      .unwrap()
      .then((data) => {
        toast({
          title: "Hệ thống thông báo",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
        dispatch(logout(false));
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Hệ thống thông báo",
          description: error.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4" mt="6" flexDir="column">
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(6, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
          gap={4}
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <FormLabel fontWeight="semibold" htmlFor="password" fontSize="sm">
              Mật khẩu
            </FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.password as any}>
              <Input
                type="password"
                id="password"
                placeholder="Mật khẩu"
                {...register("password", {
                  required: "Vui lòng điền thông tin",
                })}
                borderColor={errors?.password ? "border.error" : ""}
              />
              <FormErrorMessage>
                {errors?.password && (errors.password.message as any)}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(6, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
          gap={4}
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <FormLabel
              fontSize="sm"
              htmlFor="new_password"
              fontWeight="semibold"
            >
              Mật khẩu mới
            </FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.new_password as any}>
              <Input
                id="new_password"
                type="password"
                placeholder="Mật khẩu mới"
                {...register("new_password", {
                  required: "Vui lòng điền thông tin",
                })}
                borderColor={errors?.new_password ? "border.error" : ""}
              />
              <FormErrorMessage>
                {errors?.new_password && (errors.new_password.message as any)}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(6, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
          gap={4}
          alignItems="center"
        >
          <GridItem colSpan={1}>
            <FormLabel
              fontSize="sm"
              htmlFor="confirm_password"
              fontWeight="semibold"
            >
              Xác nhận mật khẩu mới
            </FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.confirm_password as any}>
              <Input
                type="password"
                id="confirm_password"
                placeholder="Xác nhận mật khẩu mới"
                {...register("confirm_password", {
                  required: "Vui lòng điền thông tin",
                })}
                borderColor={errors?.confirm_password ? "border.error" : ""}
              />
              <FormErrorMessage>
                {errors?.confirm_password &&
                  (errors.confirm_password.message as any)}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
      </Flex>
      <Divider my="6" />
      <Stack direction="row" spacing={4}>
        <Button
          colorScheme="blue"
          leftIcon={<CheckedIcon size={5} />}
          variant="solid"
          type="submit"
          size="medium"
        >
          Lưu lại
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePassword;

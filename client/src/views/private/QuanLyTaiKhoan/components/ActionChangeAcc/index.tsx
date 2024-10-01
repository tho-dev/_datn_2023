import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CloseSmallIcon } from "~/components/common/Icons";
import banner from "~/assets/images/banner.jpeg";
import { useEffect } from "react";
import { useUpdatePassWordMutation } from "~/redux/api/user";

type Props = {
  onClose: () => void;
  AccDetail: any;
};

const ActionChangeAccView = ({ onClose, AccDetail }: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [updatePassword, { isLoading }] = useUpdatePassWordMutation();
  // Lấy giá trị mật khẩu để so sánh với Confirm Password
  const password = watch("password", "");

  const onSubmit = async (data: any) => {
    const newDataPassWord = {
      userId: AccDetail.userId,
      oldPassword: data.oldPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
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
    onClose();
  };

  useEffect(() => {
    if (AccDetail) {
      reset(AccDetail); // Reset form với dữ liệu từ props
    }
  }, [AccDetail, reset]);
  return (
    <Box>
      <Flex justifyContent="center" mt="8">
        <Box w="60%" h="260px">
          <Image src={banner} rounded={"md"} />
        </Box>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" gap="4">
          <Flex mt="6" gap="6">
            <Flex flexDir="column" flex="2" gap="4">
              <FormControl isInvalid={errors.oldPassword as any}>
                <FormLabel
                  htmlFor="oldPassword"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Mật khẩu cũ
                </FormLabel>
                <Input
                  id="oldPassword"
                  placeholder="Mật khẩu cũ"
                  {...register("oldPassword", {
                    required: "Không được để trống !!!",
                  })}
                  type="password"
                />
                <FormErrorMessage>
                  {(errors.oldPassword as any) && errors?.oldPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password as any}>
                <FormLabel
                  htmlFor="password"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Mật khẩu mới
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu mới"
                  {...register("password", {
                    required: "Không được để trống !!!",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu ít nhất 6 ký tự",
                    },
                  })}
                />
                <FormErrorMessage>
                  {(errors.password as any) && errors?.password?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword as any}>
                <FormLabel
                  htmlFor="confirmPassword"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Xác nhận mật khẩu mới
                </FormLabel>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Xác nhận mật khẩu mới"
                  {...register("confirmPassword", {
                    required: "Không được để trống !!!",
                    validate: (value) =>
                      value === password || "Mật khẩu không trùng khớp",
                  })}
                />
                <FormErrorMessage>
                  {(errors.confirmPassword as any) &&
                    errors?.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex flexDir="column" gap="4" flex="2">
              <FormControl>
                <FormLabel htmlFor="name" fontSize="15" fontWeight="semibold">
                  Tên người dùng
                </FormLabel>
                <Input
                  type="text"
                  id="name"
                  {...register("name")}
                  readOnly
                  bg="gray.100"
                />
              </FormControl>

              <FormControl isInvalid={errors.username as any}>
                <FormLabel
                  htmlFor="username"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Tên tài khoản
                </FormLabel>
                <Input
                  id="username"
                  type="text"
                  readOnly
                  {...register("username", {
                    required: "Không được để trống !!!",
                  })}
                  bg="gray.100"
                />
                <FormErrorMessage>
                  {(errors.username as any) && errors?.username?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.expired_time as any}>
                <FormLabel
                  htmlFor="lastLogin"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Đăng nhập lần cuối
                </FormLabel>
                <Input
                  id="lastLogin"
                  type="datetime"
                  readOnly
                  {...register("lastLogin", {
                    required: "Không được để trống !!!",
                  })}
                  bg="gray.100"
                />
                <FormErrorMessage>
                  {(errors.lastLogin as any) && errors?.lastLogin?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap="3" justifyContent="flex-end" mt="6">
          <Button
            textColor="text.textDelete"
            fontWeight="bold"
            bgColor="bg.bgDelete"
            px="4"
            leftIcon={<CloseSmallIcon size={4} />}
            onClick={onClose}
          >
            Đóng
          </Button>
          <Button
            type="submit"
            bgColor="bg.bgSuccess"
            textColor="text.textSuccess"
            fontWeight="bold"
            leftIcon={<CloseSmallIcon size={4} />}
            px="4"
            loadingText="Đang tạo ..."
            isLoading={isLoading}
          >
            Tạo mới
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ActionChangeAccView;

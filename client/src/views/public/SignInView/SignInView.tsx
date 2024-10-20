import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { CodeIcon } from "~/components/common/Icons";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Center,
  Box,
  Flex,
  Link,
  Stack,
  Heading,
  Text,
  Divider,
  AbsoluteCenter,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { loginSchema } from "~/validate/user";
import { useSigninMutation } from "~/redux/api/user";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { login } from "~/redux/slices/globalSlice";
import logo from "../../../../public/LOGO V2s 348px.png";

type Props = {};

const SignInView = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(loginSchema),
  });
  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useAppDispatch();

  const [signin] = useSigninMutation();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const result: any = await signin(data);

      if (result.data?.ok) {
        toast({
          title: "Đăng nhập thành công",
          description: result.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
        dispatch(login(result.data));
        setLoading(false);
        navigate("/admin");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: result.error.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center h="full" px={{ sm: 5, md: 5, lg: 0, xl: 0, "2xl": 0 }}>
      <Flex justifyContent={"space-between"} h="full" direction="column">
        <Flex w="460px" h="full" direction="column" pt="8">
          <Flex
            gap="4"
            direction="column"
            justifyContent={"center"}
            w="full"
            alignContent={"center"}
          >
            <Image
              src={logo}
              alt="Logo VanViet"
              objectFit="contain"
              w="200px"
              mx="auto"
            />
            <Heading
              as="h3"
              color="primary.font"
              size="lg"
              fontWeight="semibold"
              textAlign="center"
            >
              Phần mềm quản lý thi công chỉnh lý, số hoá tài liệu
            </Heading>
          </Flex>
          <Stack direction="column" gap="0" py="12">
            <Heading as="h3" size="lg">
              Đăng Nhập
            </Heading>
          </Stack>
          <form
            style={{
              width: "100%",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Flex direction="column" gap="4">
              <FormControl isInvalid={errors.username as any}>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Username"
                  size="lager"
                  {...register("userName")}
                />
                <FormErrorMessage>
                  {(errors.userName as any) &&
                    (errors?.userName?.message as any)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password as any}>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  size="lager"
                  {...register("password")}
                />
                <FormErrorMessage>
                  {(errors.password as any) &&
                    (errors?.password?.message as any)}
                </FormErrorMessage>
              </FormControl>

              <Button
                size="lager"
                type="submit"
                w="full"
                mt="4"
                rounded="full"
                isLoading={loading}
                _hover={{ bg: "red" }}
              >
                Đăng Nhập
              </Button>
            </Flex>
          </form>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          my="4"
          flexDirection={"column"}
          mx="4"
        >
          <Text fontSize={"sm"} fontWeight="semibold" textAlign="center">
            © Phát triển bởi Công ty Công nghệ số V2S
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
};

export default SignInView;

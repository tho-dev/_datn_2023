import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  ArrowLeftCirleIcon,
  CodeIcon,
  GoogleIcon,
  FbIcon,
} from "~/components/common/Icons";
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
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { loginSchema } from "~/validate/user";
import { useSigninMutation } from "~/redux/api/user";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { login } from "~/redux/slices/globalSlice";
import { useGetCartByUserIdMutation } from "~/redux/api/cart";
import { addCart } from "~/redux/slices/cartSlice";

type Props = {};

const SignInView = (props: Props) => {
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
  const [getCartByUserId] = useGetCartByUserIdMutation();
  const cart_id = useAppSelector((state) => {
    state.persistedReducer.cart.carts;
  });
  const onSubmit = async (data: any) => {
    const result: any = await signin(data);
    if (result.data.status === 200) {
      const user_id = result.data.data._id;
      const cart_user: any = await getCartByUserId(user_id);

      toast({
        title: "Đăng nhập thành công",
        description: result.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      if (cart_user.data.data) {
        dispatch(addCart(cart_user.data.data.cart_id));
      }
      dispatch(login(result.data));
      navigate("/");
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: result.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Center h="full" px={{ sm: 5, md: 5, lg: 0, xl: 0, "2xl": 0 }}>
      <Flex w="460px" h="full" direction="column" pt="8">
        <Box>
          <Link as={ReactRouterLink} to="/">
            <ArrowLeftCirleIcon boxSize="10" />
          </Link>
        </Box>
        <Stack direction="row" gap="0" pt="8" pb="12">
          <Heading as="h3" color="primary.font" size="lg" fontWeight="semibold">
            Think
          </Heading>
          <Heading
            as="h3"
            size="lg"
            color="text.200"
            fontWeight="semibold"
            position="relative"
          >
            Pro
            <CodeIcon boxSize="5" position="absolute" color="primary.font" />
          </Heading>
        </Stack>
        <Stack direction="column" gap="0" pb="12">
          <Heading as="h3" size="lg">
            Đăng Nhập
          </Heading>
          <Stack direction="row" pt="2">
            <Text fontSize="sm" fontWeight="medium">
              Bạn chưa có tài khoản?
            </Text>
            <Link
              as={ReactRouterLink}
              to="/dang-ky"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Text fontSize="sm" fontWeight="medium" color="primary.font">
                Đăng Ký
              </Text>
            </Link>
          </Stack>
          <Link
            as={ReactRouterLink}
            to="/quen-mat-khau"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text fontSize="sm" fontWeight="medium">
              Quên mật khẩu?
            </Text>
          </Link>
        </Stack>
        <form
          style={{
            width: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex direction="column" gap="4">
            <FormControl isInvalid={errors.email as any}>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                size="lager"
                {...register("email")}
              />
              <FormErrorMessage>
                {(errors.email as any) && (errors?.email?.message as any)}
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
                {(errors.password as any) && (errors?.password?.message as any)}
              </FormErrorMessage>
            </FormControl>

            <Button size="lager" type="submit" w="full" mt="4" rounded="full">
              Đăng Nhập
            </Button>
          </Flex>
        </form>
        <Box position="relative" py="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Or
          </AbsoluteCenter>
        </Box>
        <Flex w="full" direction="column" gap="4">
          <Button
            size="lager"
            leftIcon={<GoogleIcon boxSize="5" />}
            w="full"
            bgColor="white"
            color="text.200"
            rounded="full"
            border="1px solid"
            borderColor="text.300"
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            size="lager"
            leftIcon={<FbIcon boxSize="5" />}
            w="full"
            bgColor="white"
            rounded="full"
            color="text.200"
            border="1px solid"
            borderColor="text.300"
          >
            Đăng nhập bằng Facebook
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default SignInView;

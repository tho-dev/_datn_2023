import { useForm } from "react-hook-form";
import * as Joi from "joi";
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
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { registerSchema } from "~/validate/user";
import { useToast } from "@chakra-ui/react";
import { useSignupMutation } from "~/redux/api/user";
type Props = {};

const SignUpView = (props: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(registerSchema),
  });
  const [signup] = useSignupMutation();
  const onSubmit = async (data: any) => {
    const avatar =
      "https://i.pinimg.com/222x/90/9e/9e/909e9e27ae77ca7da531375be6c05ac5.jpg";
    const newData = {
      ...data,
      avatar,
    };
    signup(newData)
      .unwrap()
      .then((data) => {
        toast({
          title: "Tạo tài khoản thành công",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
        navigate("/dang-nhap");
      })
      .catch((err) => {
        toast({
          title: "Tạo tài khoản thất bại",
          description: err.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      });
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
            Đăng Ký
          </Heading>
          <Stack direction="row" pt="2">
            <Text fontSize="sm" fontWeight="medium">
              Bạn đã có tài khoản?
            </Text>
            <Link
              as={ReactRouterLink}
              to="/dang-nhap"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Text fontSize="sm" fontWeight="medium" color="primary.font">
                Đăng Nhập
              </Text>
            </Link>
          </Stack>
        </Stack>
        <form
          style={{
            width: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex direction="column" gap="4">
            <Flex
              gap="5"
              flexDirection={{
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
            >
              <FormControl isInvalid={errors.first_name as any}>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  size="lager"
                  {...register("first_name")}
                />
                <FormErrorMessage>
                  {(errors.first_name as any) &&
                    (errors?.first_name?.message as any)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.last_name as any}>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                  size="lager"
                  {...register("last_name")}
                />
                <FormErrorMessage>
                  {(errors.last_name as any) &&
                    (errors?.last_name?.message as any)}
                </FormErrorMessage>
              </FormControl>
            </Flex>
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
            <Flex
              gap="5"
              flexDirection={{
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
            >
              <FormControl isInvalid={errors.phone as any}>
                <Input
                  id="phone"
                  type="text"
                  placeholder="SĐT"
                  size="lager"
                  {...register("phone")}
                />
                <FormErrorMessage>
                  {(errors.phone as any) && (errors?.phone?.message as any)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.location as any}>
                <Input
                  id="location"
                  type="text"
                  placeholder="Location"
                  size="lager"
                  {...register("location")}
                />
                <FormErrorMessage>
                  {(errors.location as any) &&
                    (errors?.location?.message as any)}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl isInvalid={errors.password as any}>
              <Input
                id="password"
                type="password"
                placeholder="Mật Khẩu"
                size="lager"
                {...register("password")}
              />
              <FormErrorMessage>
                {(errors.password as any) && (errors?.password?.message as any)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirm_password as any}>
              <Input
                id="confirm_password"
                type="password"
                placeholder="Nhập Lại Mật Khẩu"
                size="lager"
                {...register("confirm_password")}
              />
              <FormErrorMessage>
                {(errors.confirm_password as any) &&
                  (errors?.confirm_password?.message as any)}
              </FormErrorMessage>
            </FormControl>

            <Button size="lager" type="submit" w="full" mt="4" rounded="full">
              Đăng Ký
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

export default SignUpView;

import {
  Box,
  Text,
  Flex,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";

import { PictureIcon, ProfileIcon } from "~/components/common/Icons";
import {
  Link as ReactRouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import Confirmation from "./components/Confirmation";
import { useForm } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import { useState } from "react";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import {
  useGetOneQuery,
  useSignupMutation,
  useUpdateMutation,
} from "~/redux/api/user";

type Props = {};

const UpdateUserListManagerView = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetOneQuery(id);

  const [dataUser, setDataUser] = useState({} as any);
  const toast = useToast();
  const navigate = useNavigate();
  const [update] = useUpdateMutation();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm();

  const submit = (data: any) => {
    const newData = {
      ...data,
      avatar: data?.avatar?.url || "",
    };
    setDataUser(newData);
    onOpen();
  };
  const handleAddUser = () => {
    update({ data: dataUser, id: id })
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "bottom-right",
          status: "success",
          description: "Kiếm tra email của bạn để xác minh tài khoản",
        });
        reset();
        navigate("/admin/tai-khoan");
      })
      .catch((err) => {
        toast({
          title: "Thất bại",
          duration: 1600,
          position: "bottom-right",
          status: "error",
          description: err.data.errors.message,
        });
      })
      .finally(() => {
        onClose();
      });
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  const first_name = watch("first_name", data?.data.first_name);
  const last_name = watch("last_name", data?.data.last_name);
  const phone = watch("phone", data?.data.phone);
  const email = watch("email", data?.data.email);
  const location = watch("location", data?.data.location);
  const roles = watch("role", data?.data.role);
  const password = watch("password", data?.data.confirm_password);
  const confirm = watch("confirm_password", data?.data.confirm_password);
  const image = watch("avatar", data?.data.avatar);

  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading as="h2" fontSize="18px" fontWeight="semibold">
          Cập nhật tài khoản
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/admin/tai-khoan/add">
                Cập nhật tài khoản
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
      <Grid templateColumns="repeat(5,1fr)" gap={8} w="100%">
        <GridItem colSpan={3}>
          <Box
            bgColor="white"
            my={8}
            padding="16px 24px"
            borderRadius={6}
            boxShadow="lg"
          >
            <form onSubmit={handleSubmit(submit)}>
              <Grid
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontSize={16} fontWeight={600} colSpan={1}>
                  Avatar
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.avatar as any}>
                    <Flex justifyContent="center" mt="8">
                      <Box w="120px" h="120px">
                        <FileUploadThinkPro
                          fileName="category"
                          getDataFn={(data: any) => setValue("avatar", data)}
                          setData={watch("avatar")}
                        />
                      </Box>
                    </Flex>
                    <FormErrorMessage>
                      {(errors.avatar as any) && errors?.avatar?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Full name  */}
              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontSize={16} fontWeight={600} colSpan={1}>
                  Họ và tên
                </GridItem>
                <GridItem colSpan={3}>
                  <Grid
                    templateColumns={{
                      sm: "repeat(1, 1fr)",
                      md: "repeat(1, 1fr)",
                      xl: "repeat(31, 1fr)",
                    }}
                  >
                    <GridItem colSpan={15}>
                      <FormControl isInvalid={errors.firstName as any}>
                        <Input
                          fontSize={14}
                          id="firstName"
                          placeholder="firstName"
                          size="lager"
                          {...register("first_name", {
                            required: "Không được để trống !!!",
                          })}
                          defaultValue={data?.data.first_name}
                        />
                        <FormErrorMessage>
                          {(errors.first_name as any) &&
                            errors?.first_name?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <Spacer />
                    <GridItem colSpan={15}>
                      <FormControl isInvalid={errors.last_name as any}>
                        <Input
                          fontSize={14}
                          id="lastName"
                          placeholder="lastName"
                          size="lager"
                          {...register("last_name", {
                            required: "Không được để trống !!!",
                          })}
                          defaultValue={data?.data.last_name}
                        />
                        <FormErrorMessage>
                          {(errors.last_name as any) &&
                            errors?.last_name?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>

              {/* Email */}
              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontSize={16} fontWeight={600} colSpan={1}>
                  Email
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.email as any}>
                    <Input
                      id="email"
                      placeholder="abc@gmail.com"
                      size="lager"
                      {...register("email", {
                        required: "Không được để trống !!!",
                      })}
                      defaultValue={data?.data.email}
                      readOnly
                    />
                    <FormErrorMessage>
                      {(errors.email as any) && errors?.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Phone */}
              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontSize={16} colSpan={1}>
                  <Flex>
                    <Text fontWeight={600} mr={2}>
                      Số điện thoại
                    </Text>
                    <Text color={"gray"}>(Optional)</Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.phone as any}>
                    <Input
                      id="phone"
                      placeholder="(+84)XXX XXX XXX"
                      size="lager"
                      {...register("phone", {
                        required: "Không được để trống !!!",
                      })}
                      defaultValue={data?.data.phone}
                    />
                    <FormErrorMessage>
                      {(errors.phone as any) && errors?.phone?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Department */}
              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontSize={16} fontWeight={600} colSpan={1}>
                  Vai trò
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.role as any}>
                    <Input
                      id="department"
                      placeholder="Admin"
                      size="lager"
                      {...register("role", {
                        required: "Không được để trống !!!",
                      })}
                      defaultValue={data?.data.role}
                    />
                    <FormErrorMessage>
                      {(errors.role as any) && errors?.role?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Account type */}
              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontSize={16} fontWeight={600} colSpan={1}>
                  Địa chỉ
                </GridItem>
                <GridItem colSpan={3}>
                  {/* state */}
                  <FormControl isInvalid={errors.location as any}>
                    <Input
                      id="state"
                      placeholder="Địa chỉ của bạn vd : Hà nội.."
                      size="lager"
                      {...register("location", {
                        required: "Không được để trống !!!",
                      })}
                      defaultValue={data?.data.location}
                    />
                    <FormErrorMessage>
                      {(errors.location as any) && errors?.location?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>

              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontWeight={600} colSpan={1}>
                  Mật khẩu
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.password as any}>
                    <Input
                      type="password"
                      // id="password"
                      placeholder="Enter password"
                      size="lager"
                      {...register("password", {
                        required: "Không được để trống !!!",
                      })}
                      readOnly
                      defaultValue={data?.data.confirm_password}
                    />
                    <FormErrorMessage>
                      {(errors.password as any) && errors?.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
              <Grid
                mt={10}
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
                <GridItem fontWeight={600} colSpan={1}>
                  Xác nhận mật khẩu
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.confirm_password as any}>
                    <Input
                      type="password"
                      // id="password"
                      placeholder="Enter confirm password"
                      size="lager"
                      {...register("confirm_password", {
                        required: "Không được để trống !!!",
                      })}
                      readOnly
                      defaultValue={data?.data.confirm_password}
                    />
                    <FormErrorMessage>
                      {(errors.confirm_password as any) &&
                        errors?.confirm_password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
              <Flex justifyContent="flex-end" alignItems="center" mt={6}>
                <Button
                  type="submit"
                  bgColor="bg.green"
                  textColor="text.white"
                  fontWeight="bold"
                >
                  Cập nhật
                </Button>
              </Flex>
            </form>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Confirmation
            last_name={last_name}
            first_name={first_name}
            phone={phone}
            location={location}
            email={email}
            role={roles}
            password={password}
            confirm_password={confirm}
            image={image}
          />
        </GridItem>
      </Grid>
      <ConfirmThinkPro
        onClose={onClose}
        isOpen={isOpen}
        content="Bạn có chắc muốn cập nhật tài khoản này?"
        handleClick={handleAddUser}
        icon={<ProfileIcon size={10} />}
      />
    </Box>
  );
};

export default UpdateUserListManagerView;
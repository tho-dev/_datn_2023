import {
  Flex,
  Box,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Radio,
  RadioGroup,
  Image,
  Button,
  Divider,
  Spacer,
  Select,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpdateMutation } from "~/redux/api/user";
import React, { useState } from "react";
type Props = {
  data: any;
};

const Information = ({ data }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const toast = useToast();
  const [update] = useUpdateMutation();

  const onSubmit = (data_form: any) => {
    setLoading(true);
    update({ data: data_form, id: data._id })
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "bottom-right",
          status: "success",
          description: "Cập nhật thành công",
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Thất bại",
          duration: 1600,
          position: "bottom-right",
          status: "error",
          description: err.data.errors.message,
        });
      });
  };

  return (
    <Box>
      <Box
        w={"100%"}
        h={40}
        bg={"#b3e7ff"}
        borderRadius={"6px"}
        position={"relative"}
      >
        <Box position={"absolute"} top="50%" left="40%" w="300px">
          <Flex justifyContent="center">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={data?.avatar}
              alt="Dan Abramov"
            />
          </Flex>
          <Box>
            <Text textAlign="center" mt={4} fontSize="18" fontWeight="bold">
              {data?.first_name + " " + data?.last_name}
            </Text>
            <Text textAlign="center" mt={4} fontSize="14" fontWeight="bold">
              {data?.email}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box w={"100%"} h={"52"} bg={"#ffff"} borderBottomRadius={"6px"}></Box>
      <Box
        mt={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"6px"}
        p={5}
        fontSize={14}
      >
        <Text fontSize={16} fontWeight={700} mb={5}>
          Thông tin cơ bản
        </Text>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full name  */}
          <Grid
            mt={5}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
              Tên đầy đủ
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
                  <FormControl isInvalid={errors.first_name as any}>
                    <Input
                      fontSize={14}
                      id="firstName"
                      placeholder="firstName"
                      size="lager"
                      defaultValue={data?.first_name}
                      {...register("first_name", {
                        required: "Không được để trống !!!",
                      })}
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
                      defaultValue={data?.last_name}
                      {...register("last_name", {
                        required: "Không được để trống !!!",
                      })}
                    />
                    <FormErrorMessage>
                      {(errors.last_name as any) && errors?.last_name?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>

          {/* Email */}
          <Grid
            mt={5}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
              Email
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl isInvalid={errors.email as any}>
                <Input
                  fontSize={14}
                  id="email"
                  placeholder="abc@gmail.com"
                  size="lager"
                  defaultValue={data?.email}
                  value={data?.email}
                  {...register("email", {
                    required: "Không được để trống !!!",
                  })}
                  readOnly
                  bg="bg.gray"
                />
                <FormErrorMessage>
                  {(errors.email as any) && errors?.email?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          {/* Phone */}
          <Grid
            mt={5}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            <GridItem colSpan={1}>
              <Flex>
                <Text fontWeight={600} color={"#797a7b"} mr={2}>
                  Điện thoại
                </Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl isInvalid={errors.phone as any}>
                <Input
                  fontSize={14}
                  id="phone"
                  placeholder="(+84)XXX XXX XXX"
                  size="lager"
                  defaultValue={`+84${data?.phone}`}
                  {...register("phone", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.phone as any) && errors?.phone?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          {/* Department */}
          <Grid
            mt={5}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
              Vai trò
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl isInvalid={errors.department as any}>
                <Input
                  fontSize={14}
                  id="department"
                  placeholder="Admin"
                  size="lager"
                  defaultValue={data?.role}
                  value={data?.role}
                  {...register("department", {
                    required: "Không được để trống !!!",
                  })}
                  readOnly
                  bg="bg.gray"
                />
                <FormErrorMessage>
                  {(errors.department as any) && errors?.department?.message}
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
              Địa chỉ
            </GridItem>
            <GridItem colSpan={3}>
              {/* state */}
              <FormControl isInvalid={errors.state as any}>
                <Input
                  fontSize={14}
                  id="state"
                  placeholder="Địa chỉ"
                  size="lager"
                  defaultValue={data?.location}
                  {...register("state", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.state as any) && errors?.state?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          <Button
            type="submit"
            bgColor="#377dff"
            textColor="text.white"
            fontWeight="bold"
            isLoading={loading}
            m={"20px 0 0 auto"}
          >
            Lưu thay đổi
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Information;

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
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
type Props = {
  dataUser: any;
};

const Information = ({ dataUser }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {},
  });
  const toast = useToast();

  useEffect(() => {
    if (dataUser) {
      reset(dataUser); // Reset form với dữ liệu từ props
    }
  }, [dataUser, reset]);

  const onSubmit = (data_form: any) => {
    console.log(data_form);
  };

  return (
    <Box>
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
                  xl: "repeat(1, 1fr)",
                }}
              >
                <FormControl isInvalid={errors.name as any}>
                  <Input
                    fontSize={14}
                    id="name"
                    placeholder="Tên đầy đủ"
                    size="lager"
                    {...register("name", {
                      required: "Không được để trống !!!",
                    })}
                  />
                  <FormErrorMessage>
                    {(errors.name as any) && errors?.name?.message}
                  </FormErrorMessage>
                </FormControl>
              </Grid>
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
                  placeholder="Số điện thoại"
                  size="lager"
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
          {/* Cccd */}

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
                  Căn cước công dân
                </Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl isInvalid={errors.cccd as any}>
                <Input
                  fontSize={14}
                  id="cccd"
                  placeholder="Căn cước công dân"
                  size="lager"
                  {...register("cccd", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.cccd as any) && errors?.cccd?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          {/* Department */}
          {/* <Grid
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
          </Grid> */}

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
              <FormControl isInvalid={errors.address as any}>
                <Input
                  fontSize={14}
                  id="address"
                  placeholder="Địa chỉ"
                  size="lager"
                  {...register("address", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.address as any) && errors?.address?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          {/* date */}
          <Grid
            mt={5}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
              Ngày tháng năm sinh
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl isInvalid={errors.dob as any}>
                <Input
                  id="dob"
                  type="date"
                  {...register("dob", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.dob as any) && errors?.dob?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          {/* note */}
          <Grid
            mt={5}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
              Ghi chú
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl isInvalid={errors.note as any}>
                <Textarea
                  id="note"
                  size="lager"
                  p="4"
                  fontSize="sm"
                  boxShadow="none"
                  placeholder="Mô tả"
                  {...register("note", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.note as any) && errors?.note?.message}
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

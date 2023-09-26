import React from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Props = {};

const Password = (props: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();
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
          <FormControl isInvalid={errors.password as any}>
            <Input
              type="password"
              // id="password"
              placeholder="Enter current address"
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
          <FormControl isInvalid={errors.password as any}>
            <Input
              type="password"
              // id="password"
              placeholder="Confirm your new password"
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
      <Button
        type="submit"
        bgColor="#377dff"
        textColor="text.white"
        fontWeight="bold"
        m={"20px 0 0 auto"}
      >
        Lưu thay đổi
      </Button>
    </Box>
  );
};

export default Password;

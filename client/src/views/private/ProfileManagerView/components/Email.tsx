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

const Email = (props: Props) => {
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
        Thay đổi Email
      </Text>
      <Divider />
      <Flex color={"#797a7b"} mt={5}>
        <Text mr={1}>Địa chỉ email hiện tại là: </Text>
        <Text fontWeight={600}> mark@site.com</Text>
      </Flex>
      <Grid
        mt={5}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
          Địa chỉ email mới
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.email as any}>
            <Input
              id="email"
              placeholder="Enter new email address"
              size="lager"
              {...register("email", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.email as any) && errors?.email?.message}
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

export default Email;

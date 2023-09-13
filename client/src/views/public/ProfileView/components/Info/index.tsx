import { Divider, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { CheckedIcon, CloseSmallIcon } from "~/components/common/Icons";

type Props = {};

const Info = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mt="6" gap="4" flexDir="column">
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
            <Text fontSize="sm" fontWeight="semibold">
              Avatar
            </Text>
          </GridItem>
          <GridItem colSpan={4}>
            <Image
              rounded="full"
              boxSize="120px"
              src="https://gratisography.com/wp-content/uploads/2023/05/gratisography-noir-cat-free-stock-photo-800x525.jpg"
              alt="Dan Abramov"
              objectFit="cover"
            />
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
            <FormLabel fontWeight="semibold" htmlFor="name" fontSize="sm">
              Tên tài khoản
            </FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.name as any}>
              <Input
                id="name"
                placeholder="Nhập tên tài khoản"
                {...register("name", {
                  required: "Vui lòng điền thông tin ",
                })}
                borderColor={errors?.name ? "border.error" : ""}
              />
              <FormErrorMessage>
                {errors?.name && (errors.name.message as any)}
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
            <FormLabel fontSize="sm" htmlFor="email" fontWeight="semibold">
              Email
            </FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.email as any}>
              <Input
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Vui lòng điền thông tin ",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
                borderColor={errors?.email ? "border.error" : ""}
              />
              <FormErrorMessage>
                {errors?.email && (errors.email.message as any)}
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
        <Button
          colorScheme="blue"
          leftIcon={<CloseSmallIcon size={5} />}
          variant="outline"
          size="medium"
        >
          Hủy
        </Button>
      </Stack>
    </form>
  );
};

export default Info;

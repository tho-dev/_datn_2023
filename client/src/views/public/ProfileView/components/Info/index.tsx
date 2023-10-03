import { Divider, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import {
  CheckedIcon,
  CloseSmallIcon,
  PicIcon,
} from "~/components/common/Icons";
import { useUpdateMutation } from "~/redux/api/user";
import { useAppDispatch } from "~/redux/hook/hook";
import { login } from "~/redux/slices/globalSlice";

type Props = {
  user: any;
};

const Info = ({ user }: Props) => {
  const toast = useToast();
  const [update] = useUpdateMutation();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const image = watch("avatar");
  const [file, setFile] = useState<any>(null);
  const onSubmit = (data: any) => {
    if (
      data.email === user.email &&
      data.name === user.first_name + " " + user.last_name &&
      data.avatar.length <= 0
    ) {
      return;
    }
    const first_name = data.name.split(" ")[0];
    const last_name = data.name.split(" ")[1];
    update({
      first_name,
      last_name,
      avatar: user.avatar,
      email: data.email,
      _id: user._id,
    })
      .unwrap()
      .then((data) => {
        toast({
          title: "Hệ thống thông báo",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (image?.length > 0) {
      const url = URL.createObjectURL(image?.[0]);
      setFile(url);
    }
  }, [image]);

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
          <GridItem colSpan={4} position="relative">
            <Image
              rounded="full"
              boxSize="120px"
              src={file ?? user?.avatar}
              alt="Dan Abramov"
              objectFit="cover"
              border="1px solid #ccc"
            />
            <Box
              w="50px"
              height="50px"
              position="absolute"
              bottom={-4}
              left={20}
              display="flex"
              alignItems="center"
              cursor="pointer"
            >
              <FileUploadThinkPro
                accept={"image/*"}
                multiple
                register={register("avatar")}
              >
                <PicIcon size={8} color="text.gray" />
              </FileUploadThinkPro>
            </Box>
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
                defaultValue={user?.first_name + " " + user?.last_name}
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
                defaultValue={user?.email}
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

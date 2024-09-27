import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AppIcon, CloseSmallIcon } from "~/components/common/Icons";
import { useUpdatePromotionMutation } from "~/redux/api/promotion";

type Props = {
  onClose: () => void;
  promotion: any;
};

const ActionUpdatePromotion = ({ onClose, promotion }: Props) => {
  const toast = useToast();
  const [updatePromotion] = useUpdatePromotionMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (promotion) {
      reset(promotion); // Reset form với dữ liệu từ props
    }
  }, [promotion, reset]);

  const onSubmit = async (values: any) => {
    console.log(values);

    try {
      await updatePromotion(values).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Cập nhật khuyến mãi thành công",
      });
    } catch (error: any) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: JSON.stringify(error?.data?.errors),
      });
    }

    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="4">
        <Flex mt="6" gap="6">
          <Flex flexDir="column" flex="2" gap="4">
            <FormControl isInvalid={errors.name as any}>
              <FormLabel htmlFor="name" fontSize="15" fontWeight="semibold">
                Tên người dùng
              </FormLabel>
              <Input
                id="name"
                placeholder="Tên người dùng"
                {...register("name", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.name as any) && errors?.name?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="sdt" fontSize="15" fontWeight="semibold">
                Số điện thoại
              </FormLabel>
              <Input id="sdt" placeholder="SDT" {...register("phone")} />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="15" htmlFor="address" fontWeight="semibold">
                Địa Chỉ
              </FormLabel>
              <Input
                id="address"
                size="lager"
                p="4"
                fontSize="sm"
                boxShadow="none"
                placeholder="Địa Chỉ"
                {...register("address", {
                  required: "Không được để trống !!!",
                })}
              />
            </FormControl>
          </Flex>

          <Flex flexDir="column" gap="4" flex="2">
            <FormControl>
              <FormLabel fontSize="15" htmlFor="cccd" fontWeight="semibold">
                Căn cước công dân
              </FormLabel>
              <Input
                id="cccd"
                size="lager"
                p="4"
                fontSize="sm"
                boxShadow="none"
                placeholder="Căn cước công dân"
                {...register("cccd", {
                  required: "Không được để trống !!!",
                })}
              />
            </FormControl>
            <FormControl isInvalid={errors.start_time as any}>
              <FormLabel htmlFor="dob" fontSize="15" fontWeight="semibold">
                Ngày tháng năm sinh
              </FormLabel>
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

            <FormControl isInvalid={errors.description as any}>
              <FormLabel fontSize="15" htmlFor="note" fontWeight="semibold">
                Ghi chú
              </FormLabel>
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
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="3" justifyContent="flex-end" mt="6">
        <Button
          textColor="text.textDelete"
          fontWeight="bold"
          bgColor="bg.bgDelete"
          px="4"
          leftIcon={<CloseSmallIcon size={4} />}
          onClick={onClose}
        >
          Đóng
        </Button>
        <Button
          type="submit"
          bgColor="bg.bgEdit"
          textColor="text.textEdit"
          fontWeight="bold"
          leftIcon={<CloseSmallIcon size={4} />}
          px="4"
        >
          Cập nhật
        </Button>
      </Flex>
    </form>
  );
};

export default ActionUpdatePromotion;

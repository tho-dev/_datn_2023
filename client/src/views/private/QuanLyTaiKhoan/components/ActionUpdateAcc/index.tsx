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
  Image,
  Input,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import banner from "~/assets/images/banner.jpeg";
import { useForm } from "react-hook-form";
import { CloseSmallIcon } from "~/components/common/Icons";
import moment from "moment";
import { useUpdateAccMutation } from "~/redux/api/coupon";
import { useEffect } from "react";
type Props = {
  onClose: () => void;
  AccDetail: any;
};

const ActionUpdateAcc = ({ onClose, AccDetail }: Props) => {
  console.log(AccDetail);

  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [updateAcc, { isLoading }] = useUpdateAccMutation();

  const onSubmit = async (data: any) => {
    const new_data = {
      id: AccDetail.id,
      active: JSON.parse(data.isActive),
      userName: data.username,
    };

    await updateAcc(new_data)
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "top-right",
          status: "success",
          description: data.message,
        });
      })
      .catch((err) => {
        toast({
          title: "Có lỗi",
          duration: 1600,
          position: "top-right",
          status: "error",
          description: "Cập nhật Account thất bại",
        });
      })
      .finally(() => {
        onClose();
      });
  };
  useEffect(() => {
    if (AccDetail) {
      reset(AccDetail); // Reset form với dữ liệu từ props
    }
  }, [AccDetail, reset]);
  return (
    <Box>
      <Flex justifyContent="center" mt="8">
        <Box w="60%" h="260px">
          <Image src={banner} rounded={"md"} />
        </Box>
      </Flex>
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
                  {...register("name")}
                  readOnly
                  bg="gray.100"
                />
                <FormErrorMessage>
                  {(errors.name as any) && errors?.name?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="username"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Tên tài khoản
                </FormLabel>
                <Input
                  id="username"
                  placeholder="username"
                  {...register("username")}
                />
              </FormControl>
            </Flex>

            <Flex flexDir="column" gap="4" flex="2">
              <FormControl>
                <FormLabel
                  htmlFor="isActive"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Trạng thái
                </FormLabel>
                <Select
                  borderRadius="5px"
                  size="lager"
                  {...register("isActive", {
                    required: "Không được để trống !!!",
                  })}
                >
                  <option value="true" selected={AccDetail?.isActive === true}>
                    Đã kích hoạt
                  </option>
                  <option
                    value="false"
                    selected={AccDetail?.isActive === false}
                  >
                    Chưa kích hoạt
                  </option>
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.expired_time as any}>
                <FormLabel
                  htmlFor="lastLogin"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Ngày kết thúc
                </FormLabel>
                <Input
                  id="lastLogin"
                  type="datetime"
                  {...register("lastLogin", {
                    required: "Không được để trống !!!",
                  })}
                  readOnly
                  bg="gray.100"
                />
                <FormErrorMessage>
                  {(errors.coupon_end_date as any) &&
                    errors?.coupon_end_date?.message}
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
            bgColor="bg.bgSuccess"
            textColor="text.textSuccess"
            fontWeight="bold"
            leftIcon={<CloseSmallIcon size={4} />}
            px="4"
            loadingText="Đang cập nhật ..."
            isLoading={isLoading}
          >
            Cập nhật
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ActionUpdateAcc;

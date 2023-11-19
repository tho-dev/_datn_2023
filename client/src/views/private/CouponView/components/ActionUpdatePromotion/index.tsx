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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import banner from "~/assets/images/banner.jpeg";
import { useForm } from "react-hook-form";
import { CloseSmallIcon } from "~/components/common/Icons";
import moment from "moment";
import { useUpdateCouponMutation } from "~/redux/api/coupon";
type Props = {
  onClose: () => void;
  promotion: any;
};

const ActionUpdatePromotion = ({ onClose, promotion }: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [updateCoupon, { isLoading }] = useUpdateCouponMutation();
  const onSubmit = async (data: any) => {
    const new_data = {
      ...data,
      _id: promotion._id,
    };
    updateCoupon(new_data)
      .unwrap()
      .then((data) => {
        toast({
          title: "Thành công",
          duration: 1600,
          position: "top-right",
          status: "success",
          description: "Tạo khuyến mãi thành công",
        });
      })
      .catch((err) => {
        toast({
          title: "Có lỗi",
          duration: 1600,
          position: "top-right",
          status: "error",
          description: "Tạo khuyến mãi thất bại",
        });
      })
      .finally(() => {
        onClose();
      });
  };
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
                  Tên khuyến mãi
                </FormLabel>
                <Input
                  id="name"
                  placeholder="Khuyến mãi"
                  {...register("name", {
                    required: "Không được để trống !!!",
                  })}
                  defaultValue={promotion?.name}
                />
                <FormErrorMessage>
                  {(errors.name as any) && errors?.name?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="coupon_code"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Mã khuyến mãi
                </FormLabel>
                <Input
                  id="coupon_code"
                  placeholder="Mã khuyến mãi vd:NHAGIAO..."
                  {...register("coupon_code")}
                  defaultValue={promotion?.coupon_code}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="coupon_value"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Giá trị
                </FormLabel>
                <Input
                  id="coupon_value"
                  placeholder="VD:50.000đ,20.000đ..."
                  {...register("coupon_value")}
                  defaultValue={promotion?.coupon_value}
                />
              </FormControl>
            </Flex>

            <Flex flexDir="column" gap="4" flex="2">
              <FormControl>
                <FormLabel
                  htmlFor="coupon_quantity"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Số lượng
                </FormLabel>
                <Input
                  type="number"
                  id="coupon_quantity"
                  placeholder="VD:10,20,30..."
                  {...register("coupon_quantity")}
                  defaultValue={promotion?.coupon_quantity}
                />
              </FormControl>

              <FormControl isInvalid={errors.coupon_start_date as any}>
                <FormLabel
                  htmlFor="coupon_start_date"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Ngày bắt đầu
                </FormLabel>
                <Input
                  id="coupon_start_date"
                  type="datetime-local"
                  {...register("coupon_start_date", {
                    required: "Không được để trống !!!",
                  })}
                  defaultValue={moment(promotion?.coupon_start_date).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                />
                <FormErrorMessage>
                  {(errors.coupon_start_date as any) &&
                    errors?.coupon_start_date?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.expired_time as any}>
                <FormLabel
                  htmlFor="coupon_end_date"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Ngày kết thúc
                </FormLabel>
                <Input
                  id="coupon_end_date"
                  type="datetime-local"
                  {...register("coupon_end_date", {
                    required: "Không được để trống !!!",
                  })}
                  defaultValue={moment(promotion?.coupon_end_date).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
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

export default ActionUpdatePromotion;

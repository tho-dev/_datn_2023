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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusIcon } from "~/components/common/Icons";
import { useCreatePromotionMutation } from "~/redux/api/promotion";
import { useSignupMutation } from "~/redux/api/user";

type Props = {
  onClose: () => void;
};

const ActionPromotion = ({ onClose }: Props) => {
  const toast = useToast();
  const defaultPassWord = "123456";
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const fullName = watch("name") || "";
  // Hàm loại bỏ dấu tiếng Việt
  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  const [createPromotion] = useCreatePromotionMutation();
  const [signup] = useSignupMutation();

  const onSubmit = async (values: any) => {
    const { username, password, ...rest } = values;

    try {
      const data = await createPromotion(rest).unwrap();
      const dataAccount = {
        username,
        userId: data.userId,
        password,
        confirmPassword: password,
      };
      const resultAccount = await signup(dataAccount).unwrap();
      console.log(resultAccount);
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Tạo Tài khoản thành công",
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

  // Hàm xử lý việc chuyển đổi tên và bỏ dấu
  useEffect(() => {
    const nameParts = fullName.split(" ");

    if (nameParts.length === 3) {
      const firstName = nameParts[2]; // Lấy phần tên (Tấn)
      const lastNameInitial = nameParts[0].charAt(0).toLowerCase(); // Ký tự đầu của họ (Nguyễn -> n)
      const middleNameInitial = nameParts[1].charAt(0).toLowerCase(); // Ký tự đầu của đệm (Văn -> v)

      // Xóa dấu trong tên và ghép lại
      const formattedName = removeAccents(
        firstName + lastNameInitial + middleNameInitial
      );
      setValue("username", formattedName);
    } else if (nameParts.length === 2) {
      const firstName = nameParts[1]; // Lấy phần tên (Tấn)
      const lastNameInitial = nameParts[0].charAt(0).toLowerCase(); // Ký tự đầu của họ (Nguyễn -> n)

      // Xóa dấu trong tên và ghép lại
      const formattedName = removeAccents(firstName + lastNameInitial);
      setValue("username", formattedName);
    } else {
      setValue("username", ""); // Nếu không đủ họ, đệm, tên thì đặt lại formattedName rỗng
    }
  }, [fullName, setValue]);

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
              <Input
                type="number"
                id="sdt"
                placeholder="SDT"
                {...register("phone", {
                  required: "Số điện thoại là bắt buộc",
                })}
              />
              <FormErrorMessage>
                {(errors.phone as any) && errors?.phone?.message}
              </FormErrorMessage>
            </FormControl>
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
              <FormErrorMessage>
                {(errors.cccd as any) && errors?.cccd?.message}
              </FormErrorMessage>
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
              <FormErrorMessage>
                {(errors.address as any) && errors?.address?.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          <Flex flexDir="column" gap="4" flex="2">
            <FormControl>
              <FormLabel fontSize="15" htmlFor="username" fontWeight="semibold">
                UserName
              </FormLabel>
              <Input
                id="username"
                size="lager"
                p="4"
                fontSize="sm"
                boxShadow="none"
                placeholder="Tên tài khoản"
                bg="gray.100"
                readOnly
                {...register("username", {
                  required: "Không được để trống !!!",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="15" htmlFor="password" fontWeight="semibold">
                Mật Khẩu
              </FormLabel>
              <Input
                id="password"
                size="lager"
                p="4"
                fontSize="sm"
                boxShadow="none"
                placeholder="mật khẩu"
                defaultValue={`123456`}
                {...register("password", {
                  required: "Không được để trống !!!",
                })}
              />
            </FormControl>

            <FormControl isInvalid={errors.dob as any}>
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

            <FormControl isInvalid={errors.note as any}>
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
          type="submit"
          bgColor="bg.bgSuccess"
          textColor="text.textSuccess"
          fontWeight="bold"
          leftIcon={<PlusIcon size={4} />}
          px="4"
        >
          Tạo mới
        </Button>
      </Flex>
    </form>
  );
};

export default ActionPromotion;

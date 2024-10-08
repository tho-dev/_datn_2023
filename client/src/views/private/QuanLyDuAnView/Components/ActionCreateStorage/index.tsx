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
import { useForm } from "react-hook-form";
import { PlusIcon } from "~/components/common/Icons";
import { useCreateStorageMutation } from "~/redux/api/product";

type Props = {
  onClose: () => void;
  idProject: any;
};

const ActionCreateStorage = ({ onClose, idProject }: Props) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  //call api
  const [createStorage] = useCreateStorageMutation();

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      projectId: idProject,
    };
    try {
      const result = await createStorage(data).unwrap();
      console.log(result);
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Tạo đơn vị lưu trữ thành công",
      });
    } catch (error) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
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
                Tên đơn vị lưu trữ
              </FormLabel>
              <Input
                id="name"
                placeholder="vd:Phòng người có công..."
                {...register("name", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.name as any) && errors?.name?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.shortName as any}>
              <FormLabel
                htmlFor="shortName"
                fontSize="15"
                fontWeight="semibold"
              >
                Tên rút gọn
              </FormLabel>
              <Input
                type="text"
                id="shortName"
                placeholder="vd:PhongNcc"
                {...register("shortName", {
                  required: "Không được bỏ trống",
                })}
              />
              <FormErrorMessage>
                {(errors.shortName as any) && errors?.shortName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.organ as any}>
              <FormLabel htmlFor="organ" fontSize="15" fontWeight="semibold">
                Tên cấp trên
              </FormLabel>
              <Input
                type="text"
                id="organ"
                placeholder="vd:SLĐTBXH..."
                {...register("organ", {
                  required: "Số điện thoại là bắt buộc",
                })}
              />
              <FormErrorMessage>
                {(errors.organ as any) && errors?.organ?.message}
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

export default ActionCreateStorage;

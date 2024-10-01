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
import { useCreateProjectMutation } from "~/redux/api/product";

type Props = {
  onClose: () => void;
};

const ActionCreateProject = ({ onClose }: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [createProject] = useCreateProjectMutation();
  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      actualEndDate: null,
      statusId: 1,
    };
    try {
      const result = await createProject(data).unwrap();
      console.log(result);

      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Tạo Tài khoản thành công",
      });
    } catch (error) {
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
            <FormControl isInvalid={errors.projectName as any}>
              <FormLabel
                htmlFor="projectName"
                fontSize="15"
                fontWeight="semibold"
              >
                Tên dự án
              </FormLabel>
              <Input
                id="projectName"
                placeholder="Tên dự án"
                {...register("projectName", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.projectName as any) && errors?.projectName?.message}
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
                placeholder="Tên rút gọn"
                {...register("shortName", {
                  required: "Số điện thoại là bắt buộc",
                })}
              />
              <FormErrorMessage>
                {(errors.shortName as any) && errors?.shortName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.docAmount as any}>
              <FormLabel
                htmlFor="docAmount"
                fontSize="15"
                fontWeight="semibold"
              >
                Số lượng hồ sơ
              </FormLabel>
              <Input
                type="number"
                id="docAmount"
                placeholder="vd:10000,20000"
                {...register("docAmount", {
                  required: "không được bỏ trống",
                })}
              />
              <FormErrorMessage>
                {(errors.docAmount as any) && errors?.docAmount?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.fieldAmount as any}>
              <FormLabel
                htmlFor="fieldAmount"
                fontSize="15"
                fontWeight="semibold"
              >
                Số lượng trường nhập
              </FormLabel>
              <Input
                type="number"
                id="fieldAmount"
                placeholder="vd:10000,20000"
                {...register("fieldAmount", {
                  required: "không được bỏ trống",
                })}
              />
              <FormErrorMessage>
                {(errors.fieldAmount as any) && errors?.fieldAmount?.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          <Flex flexDir="column" gap="4" flex="2">
            <FormControl isInvalid={errors.pageAmount as any}>
              <FormLabel
                htmlFor="pageAmount"
                fontSize="15"
                fontWeight="semibold"
              >
                Số lượng trang scan
              </FormLabel>
              <Input
                type="number"
                id="pageAmount"
                placeholder="vd:10000,20000"
                {...register("pageAmount", {
                  required: "không được bỏ trống",
                })}
              />
              <FormErrorMessage>
                {(errors.pageAmount as any) && errors?.pageAmount?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.dob as any}>
              <FormLabel
                htmlFor="startDate"
                fontSize="15"
                fontWeight="semibold"
              >
                Ngày bắt đầu
              </FormLabel>
              <Input
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.startDate as any) && errors?.startDate?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.endDate as any}>
              <FormLabel htmlFor="endDate" fontSize="15" fontWeight="semibold">
                Ngày hoàn thành dự kiến
              </FormLabel>
              <Input
                id="endDate"
                type="date"
                {...register("endDate", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.endDate as any) && errors?.endDate?.message}
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

export default ActionCreateProject;

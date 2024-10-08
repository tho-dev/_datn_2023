import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusIcon } from "~/components/common/Icons";
import { useUpdateProjectMutation } from "~/redux/api/product";

type Props = {
  onClose: () => void;
  dataProject: any;
};

const ActionUpdateProject = ({ onClose, dataProject }: Props) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [updateProject] = useUpdateProjectMutation();
  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      actualEndDate: null,
      statusId: 1,
    };
    try {
      await updateProject(data).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "cập nhật dự án thành công",
      });
    } catch (error) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "cập nhật thất bại",
      });
    }
    reset();
    onClose();
  };
  useEffect(() => {
    if (dataProject) {
      reset(dataProject); // Reset form với dữ liệu từ props
    }
  }, [dataProject, reset]);
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
            <FormControl isInvalid={errors.isHidden as any}>
              <Flex alignItems="center">
                <FormLabel
                  htmlFor="isHidden"
                  fontSize="15"
                  fontWeight="semibold"
                  my="4"
                >
                  Ẩn dự án
                </FormLabel>
                <Checkbox id="isHidden" {...register("isHidden")} />
              </Flex>
              <FormErrorMessage>
                {(errors.isHidden as any) && errors?.isHidden?.message}
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
          Cập nhật
        </Button>
      </Flex>
    </form>
  );
};

export default ActionUpdateProject;

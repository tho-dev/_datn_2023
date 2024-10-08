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
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PlusIcon } from "~/components/common/Icons";
import { useUpdateStatusProjectMutation } from "~/redux/api/product";

type Props = {
  onClose: () => void;
  dataProject: any;
  dataStatusId: any;
};

const ActionUpdateStatusProject = ({
  onClose,
  dataProject,
  dataStatusId,
}: Props) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  // call api
  const [updateStatusProject] = useUpdateStatusProjectMutation();

  const statusId = watch("statusId");
  const onSubmit = async (values: any) => {
    const data = {
      id: dataProject.id,
      actualEndDate: values.statusId == 1 ? null : values.actualEndDate,
      statusId: Number(values.statusId),
    };
    try {
      const result = await updateStatusProject(data).unwrap();
      console.log(result);
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
          <Flex flexDir="column" gap="4" flex="2">
            <FormControl isInvalid={errors.statusId as any}>
              <FormLabel fontSize="15" htmlFor="note" fontWeight="semibold">
                Trạng thái dự án
              </FormLabel>
              <Select
                borderRadius="5px"
                size="lager"
                {...register("statusId", {
                  required: "Không được để trống !!!",
                })}
              >
                {dataStatusId?.map((item: any) => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id === dataProject?.statusId}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {(errors.note as any) && errors?.note?.message}
              </FormErrorMessage>
            </FormControl>
            {statusId == 2 && (
              <FormControl isInvalid={errors.actualEndDate as any}>
                <FormLabel
                  htmlFor="actualEndDate"
                  fontSize="15"
                  fontWeight="semibold"
                >
                  Ngày hoàn thành thực tế
                </FormLabel>
                <Input
                  id="actualEndDate"
                  type="date"
                  {...register("actualEndDate", {
                    required: "Không được để trống !!!",
                  })}
                />
                <FormErrorMessage>
                  {(errors.actualEndDate as any) &&
                    errors?.actualEndDate?.message}
                </FormErrorMessage>
              </FormControl>
            )}
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
          Cập nhật trạng thái
        </Button>
      </Flex>
    </form>
  );
};

export default ActionUpdateStatusProject;

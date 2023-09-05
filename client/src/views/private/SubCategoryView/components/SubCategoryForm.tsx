import { Box, Heading, Select, Textarea } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

type Props = {
  data: any;
};

const SubCategoryForm = ({ data }: Props) => {
    console.log(data)
  const isCreateForm = data == undefined;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm();
  function onSubmit(values) {
    console.log("values: ", values)
    reset()
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     resolve();
    //   }, 3000);
    // });
  }
  const fakeData = [
    {
      categoryName: "Category 1",
      categoryId: "1",
    },
    {
      categoryName: "Category 2",
      categoryId: "2",
    },
    {
      categoryName: "Category 3",
      categoryId: "3",
    },
  ];
  return (
    <Box borderWidth={1} rounded={"sm"} p={4} fontSize="14px">
      <Heading fontSize="md" pb={4} borderBottomWidth={1}>
        {isCreateForm ? "Tạo mới" : "Cập nhật"}
      </Heading>
      <Box pt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Tên danh mục con</FormLabel>
            <Input
              id="name"
              placeholder="Nhập tên danh mục con..."
              {...register("name", {
                required: "Không được để trống",
                minLength: { value: 6, message: "Tên phải dài hơn 6 kí tự" },
              })}
              defaultValue={data?.name}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl pt={4} isInvalid={errors.categoryId}>
            <FormLabel>Chọn danh mục</FormLabel>
            <Select
              {...register("categoryId", {
                required: "Vui lòng chọn 1",
              })}
            >
              {fakeData.map((fakeCategory) => (
                <option
                  key={fakeCategory.categoryId}
                  value={fakeCategory.categoryId}
                  checked={fakeCategory.categoryId == data?.categoryId}
                >
                  {fakeCategory.categoryName}
                </option>
              ))}
            </Select>

            <FormErrorMessage>
              {errors.categoryId && errors.categoryId.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl pt={4} isInvalid={errors.name}>
            <FormLabel htmlFor="description">Mô tả</FormLabel>
            <Textarea
              id="description"
              placeholder="Nhập mô tả..."
              {...register("description", {
                required: "Không được để trống",
              })}
              defaultValue={data?.description}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            bgColor={isCreateForm ? "green.500" : "red.500"}
            isLoading={isSubmitting}
            type="submit"
          >
            {isCreateForm ? "Tạo mới" : "Lưu lại"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SubCategoryForm;

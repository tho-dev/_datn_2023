import DialogThinkPro from "~/components/DialogThinkPro";
import { Box, Heading, Select, Textarea } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

type Props = {
  type: "view" | "create" | "update";
  isOpen: any;
  onClose: any;
  data?: any;
};

const ProductForm = ({ type, data, isOpen, onClose }: Props) => {
  console.log("data: ",data?.title);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  function onSubmit(values) {
    reset();
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
    <DialogThinkPro
      isOpen={isOpen}
      onClose={onClose}
      size={"3xl"}
      title={
        type == "view"
          ? "Chi tiết bài viết"
          : type == "create"
          ? "Thêm bài viết"
          : "Cập nhật bài viết"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title">Tiêu đề bài viết</FormLabel>
          <Input
            id="title"
            placeholder="Nhập tên bài viết..."
            {...register("title", {
              required: "Không được để trống",
              minLength: { value: 6, message: "Tên phải dài hơn 6 kí tự" },
            })}
            defaultValue={data?.title}
            readOnly={type == "view"}
          />
          <FormErrorMessage>
            {errors?.title && errors?.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          pt={4}
          isInvalid={errors.categoryId}
          isDisabled={type == "view"}
        >
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
        <FormControl pt={4} isInvalid={errors.author}>
          <FormLabel htmlFor="author">Tác giả</FormLabel>
          <Textarea
            id="author"
            placeholder="Tác giả"
            {...register("author", {
              required: "Không được để trống",
            })}
            defaultValue={data?.author}
            readOnly={type == "view"}
          />
          <FormErrorMessage>
            {errors.author && errors.author.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pt={4} isInvalid={errors.image}>
            <FormLabel>Hình ảnh</FormLabel>
           { data?.image ? <>
            <div
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                }}
            >
                <img src={data?.image} alt="" width="50px" height="50px" />
            </div>
           </>:<>
                <Input type="file"/>
           </>


           }
        </FormControl>
        <FormControl pt={4} isInvalid={errors.short_description}>
          <FormLabel htmlFor="short_description">Mô tả ngắn</FormLabel>
          <Textarea
            id="short_description"
            placeholder="Nhập mô tả..."
            {...register("short_description", {
              required: "Không được để trống",
            })}
            defaultValue={data?.short_description}
            readOnly={type == "view"}
          />
          <FormErrorMessage>
            {errors.short_description && errors.short_description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pt={4} isInvalid={errors.content}>
          <FormLabel htmlFor="content">Nội dung bài viết</FormLabel>
          <Textarea
            id="content"
            placeholder="Nhập nội dung"
            {...register("content", {
              required: "Không được để trống",
            })}
            defaultValue={data?.content}
            readOnly={type == "view"}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          hidden={type == "view"}
        >
          Lưu
        </Button>
      </form>
    </DialogThinkPro>
  );
};

export default ProductForm;

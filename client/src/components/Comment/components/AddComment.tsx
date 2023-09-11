import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Text,
  Textarea,
  Box,
  Image,
} from "@chakra-ui/react";
import { CloseSmallIcon, PictureIcon, Star } from "~/components/common/Icons";

type Props = {
  onClose: () => void;
};

const AddComment = ({ onClose }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4">
        <FormControl isInvalid={errors.name as any} mt={7}>
          <Textarea
            h={30}
            id="name"
            placeholder="Hãy chia sẻ cảm nhận đánh giá của bạn về sản phẩm này nhé"
            size="lager"
            {...register("name", {
              required: "Không được để trống !!!",
            })}
          />
          <FormErrorMessage>
            {(errors.name as any) && errors?.name?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.file as any}>
          <Input
            id="file"
            placeholder="VD: Dell"
            size="lager"
            type="file"
            display="none"
            {...register("file", {
              required: "Không được để trống !!!",
            })}
          />
          <FormErrorMessage>
            {(errors.file as any) && errors?.file?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="3" justifyContent="flex-start" mt="4">
        <Button
          type="submit"
          bgColor="text.textSuccess"
          textColor="text.white"
          fontWeight="bold"
          px="4"
        >
          Gửi đánh giá
        </Button>
        <FormLabel htmlFor="file" cursor="pointer">
          <Button
            type="submit"
            bgColor="text.textSuccess"
            leftIcon={<PictureIcon size={4} color="#fff" />}
            px="4"
            textColor="text.white"
            fontWeight="bold"
          >
            Thêm ảnh
          </Button>
        </FormLabel>
      </Flex>
    </form>
  );
};

export default AddComment;

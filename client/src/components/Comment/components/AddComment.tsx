import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from '~/firebase';

type Props = {
  onClose: () => void;
};

interface IComment {
  id: string;
  userId: string;
  content: string;
  dateTime?: any;
  productId: string;
}

const AddComment = ({ onClose }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();



  function onSubmit(values: any) {

    const uuid = uuidv4();

    const commentToSend: IComment = {
      id: uuid,
      userId: 'abc',
      content: values,
      dateTime: Date.now(),
      productId: 'abc'
    }
    set(ref(db, `comments/${uuid}`), {
      ...commentToSend
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
      </Flex>
    </form>
  );
};

export default AddComment;

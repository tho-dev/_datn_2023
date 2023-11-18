import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
// import { set, ref, onValue, remove, update } from "firebase/database";
// import { db } from '~/firebase';
import { ref, set } from "firebase/database";
import { db } from "~/firebase";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";
import moment from "moment";

type Props = {
  onClose: () => void;
  productId: string;
};

const AddComment = ({ onClose, productId }: Props) => {
  // handle form
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // user
  const { user, isLogin } = useAppSelector(
    (state: RootState) => state.persistedReducer.global
  );
  const userFullName = user?.first_name + " " + user?.last_name;
  const now = moment();
  const dateTime = now.format("HH:mm DD/MM/YYYY");

  function onSubmit(values: any) {
    const uuid = uuidv4();

    set(ref(db, "comments/" + uuid), {
      id: uuid,
      userId: user?._id,
      userAvatar: user?.avatar,
      userName: userFullName,
      content: values.content,
      dateTime,
      productId: productId,
    });
    setValue("content", "");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4">
        <FormControl isInvalid={errors.name as any} mt={7}>
          <Textarea
            h={30}
            id="content"
            placeholder={
              isLogin
                ? "Hãy chia sẻ cảm nhận đánh giá của bạn về sản phẩm này nhé"
                : "Hãy đăng nhập để đánh giá về sản phẩm"
            }
            size="lager"
            {...register("content", {
              required: "Không được để trống !!!",
            })}
            isReadOnly={!isLogin}
          />
          <FormErrorMessage>
            {(errors.name as any) && errors?.name?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="3" justifyContent="flex-start" mt="4">
        <Button
          type="submit"
          bgColor={isLogin ? "text.textSuccess" : "bg.darkGray"}
          textColor="text.white"
          fontWeight="bold"
          px="4"
          isDisabled={!isLogin}
        >
          Gửi đánh giá
        </Button>
      </Flex>
    </form>
  );
};

export default AddComment;

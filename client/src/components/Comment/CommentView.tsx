import { Text, Box } from "@chakra-ui/layout";
import { Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { set, ref, onValue, remove, push } from "firebase/database";
import { db } from "~/firebase";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Flex,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
// import { set, ref, onValue, remove, update } from "firebase/database";
// import { db } from '~/firebase';
import moment from "moment";
import { useRef } from "react";

const CommentView = ({ productId }: any) => {
  //state
  const [comments, setComments] = useState<any>([]);
  const [selectedComment, setSelectedComment] = useState<any>();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState({} as any);

  // handle form
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast({});

  // user
  const { user, isLogin } = useAppSelector(
    (state: RootState) => state.persistedReducer.global
  );
  const userFullName = user?.first_name + " " + user?.last_name;
  const now = moment();
  const dateTime = now.format("HH:mm DD/MM/YYYY");

  // ref
  const lastCommentTimeRef = useRef<any>(null);

  //add comment
  const addComment = (values: any) => {
    const uuid = uuidv4();
    const nowTime = new Date().getTime();

    if (lastCommentTimeRef.current === null) {
      set(ref(db, "comments/" + uuid), {
        id: uuid,
        userId: user?._id,
        userAvatar: user?.avatar,
        userName: userFullName,
        content: values.content,
        dateTime,
        replies: [],
        productId: productId,
      });
      setValue("content", "");
      lastCommentTimeRef.current = nowTime;
    } else {
      const timeDiff = nowTime - lastCommentTimeRef.current;
      if (timeDiff >= 5 * 60 * 1000) {
        set(ref(db, "comments/" + uuid), {
          id: uuid,
          userId: user?._id,
          userAvatar: user?.avatar,
          userName: userFullName,
          content: values.content,
          dateTime,
          productId: productId,
          replies: [],
        });
        setValue("content", "");
        lastCommentTimeRef.current = nowTime;
      } else {
        toast({
          title: "Vui lòng không bình luận liên tục",
          duration: 1600,
          position: "bottom-right",
          status: "warning",
          description: `Bạn cần đợi ${Math.floor(
            5 - timeDiff / (60 * 1000)
          )} phút nữa trước khi gửi bình luận tiếp theo!`,
        });
      }
    }
  };

  function onSubmit(values: any) {
    isReplying ? addReply(values, selectedComment.id) : addComment(values);
  }

  //get comments
  const getComments = () => {
    onValue(ref(db), (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const commentArray: any = Object.entries(data.comments).map(
          ([_, comment]) => ({ comment })
        );

        setComments(
          commentArray.filter(({ comment }: any) => {
            return comment.productId == productId;
          })
        );
      }
    });
  };

  // add reply
  const addReply = async (values: any, commentId: any) => {
    const replyListRef = ref(db, `comments/${commentId}/replies`);
    const replyRef = push(replyListRef);
    const uuid = uuidv4();

    const newReply = {
      id: uuid,
      userId: user?._id,
      userAvatar: user?.avatar,
      userName: userFullName,
      content: values.content,
      dateTime,
      productId: productId,
    };

    set(replyRef, newReply);

    setValue("content", "");
    setIsReplying(false);
  };

  // handle add reply
  const handleAddReply = (comment: any) => {
    setIsReplying(true);
    setSelectedComment(comment);
  };

  // handle cancle reply
  const cancelReply = () => {
    setIsReplying(false);
    setSelectedComment(null);
  };

  //handle delete reply
  const handleDeleteReply = (commentId: any, replyId: any) => {
    remove(ref(db, `/comments/${commentId}/replies/${replyId}`));
    toast({
      title: "Đã xóa phản hồi của bạn",
      duration: 2000,
      position: "bottom-right",
      status: "success",
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  //delete comment
  const openConfirm = (id: any) => {
    setComment(id);
    onOpen();
  };

  const handleDelete = () => {
    remove(ref(db, `/comments/${comment?.id}`));
    onClose();
  };

  return (
    <>
      <Box
        my="6"
        bg="white"
        w="100%"
        rounded="lg"
        py={{
          sm: "8",
          lg: "8",
        }}
        px={{
          sm: "6",
          md: "6",
          lg: "6",
          xl: "6",
        }}
      >
        <Box>
          <Text pl={"10px"} fontSize={"16px"} fontWeight={700}>
            Bình Luận sản phẩm
          </Text>

          {comments.length > 0 &&
            comments.map(({ comment }: any) => {
              const replies = [];
              if (comment.replies) {
                for (const [key, value] of Object.entries(comment.replies)) {
                  replies.push({ value, key });
                }
              }

              return (
                <Box
                  boxShadow={"sm"}
                  borderRadius={"12px"}
                  p={"16px"}
                  my={"10px"}
                  key={comment.id}
                >
                  {/* comment UI */}
                  <Flex alignItems={"center"} gap={2}>
                    <Avatar
                      size="md"
                      name="Kent Dodds"
                      src={comment.userAvatar}
                    />{" "}
                    <Flex justifyContent={"space-between"} w={"full"}>
                      <Box>
                        <Text
                          fontSize={"14px"}
                          fontWeight={700}
                          color={"blue.500"}
                          pr={"10px"}
                        >
                          {comment?.userName}
                        </Text>
                        <Text> {comment.content}</Text>
                        <Flex alignItems={"center"}>
                          <Text fontSize={"12px"} color={"gray.400"}>
                            {comment.dateTime}
                          </Text>
                          {user.role === "admin" && (
                            <Button
                              bg={"none"}
                              color={"gray.500"}
                              _hover={{ color: "black" }}
                              onClick={() => handleAddReply(comment)}
                            >
                              Phản hồi
                            </Button>
                          )}
                          {comment.userId == user?._id && (
                            <Button
                              bg={"none"}
                              color={"gray.500"}
                              _hover={{ color: "black" }}
                              onClick={() => openConfirm(comment)}
                            >
                              Xóa
                            </Button>
                          )}
                        </Flex>
                      </Box>
                    </Flex>
                  </Flex>

                  {/* reply UI */}

                  {!!comment.replies &&
                    replies.map((reply: any) => (
                      <Flex alignItems={"center"} gap={2} ml={8}>
                        <Avatar
                          size="md"
                          name={reply.value.userName}
                          src={reply.value.userAvatar}
                        />{" "}
                        <Flex justifyContent={"space-between"} w={"full"}>
                          <Box>
                            <Text
                              fontSize={"14px"}
                              fontWeight={700}
                              color={"blue.500"}
                              pr={"10px"}
                            >
                              {reply.value.userName}
                            </Text>
                            <Text> {reply.value.content}</Text>
                            <Flex alignItems={"center"}>
                              <Text fontSize={"12px"} color={"gray.400"}>
                                {reply.value.dateTime}
                              </Text>
                              {reply.value.userId == user?._id && (
                                <Button
                                  bg={"none"}
                                  color={"gray.500"}
                                  _hover={{ color: "black" }}
                                  onClick={() =>
                                    handleDeleteReply(comment.id, reply.key)
                                  }
                                >
                                  Xóa
                                </Button>
                              )}
                            </Flex>
                          </Box>
                        </Flex>
                      </Flex>
                    ))}
                </Box>
              );
            })}
          <ConfirmThinkPro
            isOpen={isOpen}
            onClose={onClose}
            handleClick={handleDelete}
            content="Bạn có chắc chắn muốn xóa bình luận này ?"
          />
        </Box>

        {/* form add comment & reply */}
        {isReplying && (
          <Flex mt={4} alignItems={"center"} gap={"8px"}>
            <Text fontSize={"12px"}>
              Bạn đang phản hồi bình luận của{" "}
              <Text as={"span"} fontWeight={700}>
                {selectedComment?.userName}
              </Text>{" "}
            </Text>
            -
            <Button size="sm" onClick={cancelReply}>
              Hủy
            </Button>
          </Flex>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="4" my={2}>
            <FormControl isInvalid={errors.name as any}>
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
      </Box>
    </>
  );
};

export default CommentView;

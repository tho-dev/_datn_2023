import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "~/firebase";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";

type Props = {
  productId: string;
};

const Client = (props: Props) => {
  const [comments, setComments] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState({} as any);
  const { productId } = props;
  const { user } = useAppSelector(
    (state: RootState) => state.persistedReducer.global
  );

  //get data
  useEffect(() => {
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
  }, []);

  //delete
  const openConfirm = (id: any) => {
    setComment(id);
    onOpen();
  };
  const handleDelete = () => {
    remove(ref(db, `/comments/${comment?.id}`));
    onClose();
  };

  return (
    <Box>
      <Text pl={"10px"} fontSize={"16px"} fontWeight={700}>
        Bình Luận sản phẩm
      </Text>
      {comments.map(({ comment }: any) => (
        <Box
          boxShadow={"sm"}
          borderRadius={"12px"}
          p={"16px"}
          my={"10px"}
          key={comment.id}
        >
          <Flex alignItems={"center"} gap={2}>
            <Avatar size="md" name="Kent Dodds" src={comment.userAvatar} />{" "}
            <Flex justifyContent={"space-between"} w={"full"}>
              <Box>
                <Text
                  fontSize={"14px"}
                  fontWeight={700}
                  color={"blue.500"}
                  pr={"10px"}
                >
                  {comment.userName}
                </Text>
                <Text> {comment.content}</Text>
                <Flex alignItems={"center"}>
                  <Text fontSize={"12px"} color={"gray.400"}>
                    {comment.dateTime}
                  </Text>
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
        </Box>
      ))}
      <ConfirmThinkPro
        isOpen={isOpen}
        onClose={onClose}
        handleClick={handleDelete}
        content="Bạn có chắc chắn muốn xóa bình luận này ?"
      />
    </Box>
  );
};

export default Client;

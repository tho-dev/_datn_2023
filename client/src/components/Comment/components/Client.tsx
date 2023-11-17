import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Spacer,
  Divider,
} from "@chakra-ui/layout";
import { Avatar, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from "~/firebase";

type Props = {
  productId: string;
};

const Client = (props: Props) => {
  const [comments, setComments] = useState<any>([]);
  const { productId } = props;
  //get data
  useEffect(() => {
    onValue(ref(db), (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const commentArray: any = Object.entries(data.comments).map(([_, value]) => ({ value }));

        setComments(commentArray.filter(({ comment }: any) => {
          return comment.productId == productId
        }));
      }
    });
  }, []);

  //delete
  const handleDelete = (comment: any) => {
    remove(ref(db, `/comments/${comment.comment.id}`));
  };

  return (
    <Box>
      <Divider mt={6} />

      <Grid
        mt={5}
        gap={{
          sm: "0",
          md: "0",
          xl: "8",
        }}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        {
          comments.map(({ comment }: any) => (
            <>
              <GridItem mr={7} colSpan={1}>
                <Flex>
                  <Avatar
                    name="ThinkPro"
                    src={comment.userAvatar || ''}
                    w="10"
                    h="10"
                    color="#12AFF0"
                    fontSize="xs"
                    bgColor="#12AFF033"
                  />
                  <Box ml={3}>
                    <Text fontWeight={"black"}>{comment.userName}</Text>
                  </Box>
                </Flex>
              </GridItem>
              <GridItem colSpan={3}>
                <Text color={"black"} fontSize={"13px"}>
                  {comment.content}
                </Text>
                <Flex
                  mt={"5px"}
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Text color={"gray"} fontSize={"12px"}>
                    {comment.dateTime}
                  </Text>
                </Flex>
              </GridItem>
            </>
          ))
        }

      </Grid>
    </Box>
  );
};

export default Client;

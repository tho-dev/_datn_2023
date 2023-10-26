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
import {
  Annotation,
  Thumbs,
  Chat,
  Share,
  Check,
  Star,
} from "~/components/common/Icons";

type Props = {};

const Client = (props: Props) => {
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
        <GridItem mr={7} colSpan={1}>
          <Flex>
            <Avatar
              name="ThinkPro"
              // src="https://bit.ly/broken-link"
              w="10"
              h="10"
              color="#12AFF0"
              fontSize="xs"
              bgColor="#12AFF033"
            />
            <Box ml={3}>
              <Text fontWeight={"black"}>Duy Thuan</Text>
              <Text fontSize={13} color={"gray"}>
                Đã tham gia 2 tháng
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>
          <Text color={"black"} fontSize={"13px"}>
            Bàn phím gõ êm, vì size nhỏ gọn nên các phím mũi tên hơi gần các
            phím khác. 10 chế độ LED chủ yếu là chế độ chuyển động. Kết nối USB
            type A to C nên tiện tháo rời và di chuyển.
          </Text>
          <Flex
            mt={"5px"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Text color={"gray"} fontSize={"12px"}>
              Đánh giá vào 10 tháng trước
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Client;

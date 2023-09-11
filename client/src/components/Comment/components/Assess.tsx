import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image, Divider } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Star, Star_Half, Star_Nocolor } from "~/components/common/Icons";

const Assess = () => {
  return (
    <Box>
      <Grid
        my="10"
        gap={{
          sm: "2",
          md: "2",
          xl: "8",
        }}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
      >
        {/* Left */}
        <GridItem colSpan={1}>
          <Flex></Flex>
          <Text fontWeight={"bold"}>Tổng quan</Text>
          <Flex
            // py={2}
            alignItems="center"
            gap={2}
          >
            <Text fontSize={"xl"} fontWeight={"bold"}>
              4.4
            </Text>
            <Flex>
              <Star size={4} />
              <Star size={4} />
              <Star size={4} />
              <Star size={4} />
              <Star_Half size={4} />
            </Flex>
          </Flex>
          <Text fontSize={"14px"} color={"gray.500"}>
            (64 đánh giá)
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontWeight={"bold"}>Tất cả hình ảnh</Text>
          <Grid
            gap={{
              sm: "2",
              md: "2",
              xl: "2",
            }}
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
          >
            <GridItem colSpan={1}>
              {" "}
              <Image
                color={"1"}
                src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png"
              />
            </GridItem>
            <GridItem colSpan={1}>
              {" "}
              <Image
                color={"1"}
                src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png"
              />
            </GridItem>
            <GridItem colSpan={1}>
              {" "}
              <Image
                color={"1"}
                src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png"
              />
            </GridItem>
            <GridItem colSpan={1}>
              {" "}
              <Image
                color={"1"}
                src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png"
              />
            </GridItem>
            <GridItem colSpan={1}>
              {" "}
              <Image
                color={"1"}
                src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png"
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Assess;

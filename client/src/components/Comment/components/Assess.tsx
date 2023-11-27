import { Box, Text, Flex } from "@chakra-ui/layout";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Star, Star_Half } from "~/components/common/Icons";

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
      </Grid>
    </Box>
  );
};

export default Assess;

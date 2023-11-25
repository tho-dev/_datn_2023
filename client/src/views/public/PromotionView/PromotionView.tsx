import { Box, Grid, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useParams } from "react-router";
import CardThinkPro from "~/components/CardThinkPro";
import LoadingPolytech from "~/components/LoadingPolytech";
import { useGetSinglePromotionQuery } from "~/redux/api/promotion";

const PromotionView = () => {
  const { slug } = useParams();

  const { data, isLoading } = useGetSinglePromotionQuery(
    {
      slug: slug,
    },
    {
      skip: !slug,
    }
  );
  if (isLoading) {
    return <LoadingPolytech />;
  }
  return (
    <Box my={6}>
      <Box w="100%" borderRadius="xl" overflow="hidden">
        <Image
          borderTopRadius={"xl"}
          src={data?.thumbnail?.url}
          w="full"
          h="full"
          objectFit="cover"
        />

        <Box bg="white" p={7} fontSize={20} fontWeight={"bold"}>
          <Text>{data?.name}</Text>
        </Box>
      </Box>

      <Grid
        mt={6}
        rowGap="6"
        columnGap="4"
        rounded="xl"
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          xl: `repeat(5, 1fr)`,
        }}
      >
        {data?.items?.map((item: any, index: number) => {
          return <CardThinkPro key={index} product={item} />;
        })}
      </Grid>
    </Box>
  );
};

export default PromotionView;

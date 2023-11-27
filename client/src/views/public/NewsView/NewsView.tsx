import { Box, Grid, GridItem, Text, Flex } from "@chakra-ui/layout";
import NewsCategory from "./components/NewsCategory";
import { Divider, Button } from "@chakra-ui/react";
import { useGetAllPostQuery } from "~/redux/api/post";
import AllNewsView from "./AllNewsView";
import { useEffect, useState } from "react";
import LoadingPolytech from "~/components/LoadingPolytech";

const NewsView = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");

  const { data: posts, isLoading } = useGetAllPostQuery({
    _order: "asc",
    _sort: "date",
    _page: currentPage,
    _limit: 5,
    _type: category || "",
  });

  useEffect(() => {
    if (posts) {
      const docs = posts?.data?.items as any;
      setData([...docs]);
    }
  }, [posts]);

  const loadMore = () => {
    if (posts?.data?.paginate?.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (isLoading) {
    return <LoadingPolytech />;
  }
  return (
    <Box>
      <NewsCategory category={category} setCategory={setCategory} />
      <Divider my="12" />
      <Grid
        my="10"
        gap={{
          sm: "0",
          md: "0",
          xl: "8",
        }}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(1, 1fr)",
        }}
      >
        <GridItem>
          {data?.map((product: any, index: number) => (
            <AllNewsView product={product} key={index} />
          ))}
          {data.length == 0 && (
            <Text fontSize={"14px"} fontWeight="bold">
              Không có bài viết nào
            </Text>
          )}
          {data.length > 0 && (
            <Flex justifyContent="center" alignItems="center" mt="4">
              <Button
                bg="white"
                color="text.blue"
                fontWeight="bold"
                onClick={loadMore}
                disabled={!posts?.data?.paginate?.hasNextPage}
                _hover={{ bg: "gray.200" }}
              >
                Xem Thêm
              </Button>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NewsView;

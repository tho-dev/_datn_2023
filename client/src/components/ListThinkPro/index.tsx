import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import CardThinkPro from "~/components/CardThinkPro";
import { Button, Skeleton } from "@chakra-ui/react";

type Props = {
  mt?: any; // margin-top
  columns?: any; // số cột
  data?: any;
  loading?: boolean;
};

const ListThinkPro = ({
  mt = 6,
  columns = 5,
  data,
  loading = false,
}: Props) => {
  return (
    <Grid
      w="full"
      gap="3"
      mt={mt}
      templateColumns={{
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        xl: `repeat(${columns}, 1fr)`,
      }}
    >
      {!loading &&
        data?.map((product: any, index: number) => {
          return (
            <GridItem key={index}>
              <CardThinkPro product={product} />
            </GridItem>
          );
        })}

      {/* Skeleton */}
      {loading &&
        Array(20)
          .fill(0)
          .map((index) => {
            return (
              <GridItem key={index}>
                <Flex
                  w="full"
                  h="full"
                  overflow="hidden"
                  flexDir="column"
                  gap="4"
                  rounded="lg"
                >
                  <Skeleton>
                    <Box w="full" pb="100%" />
                  </Skeleton>
                  <Flex gap="2" flexDir="column">
                    {Array(3)
                      .fill(0)
                      .map((k) => {
                        return (
                          <Skeleton key={k}>
                            <Box key={k} w="full" h="5" />
                          </Skeleton>
                        );
                      })}
                  </Flex>
                </Flex>
              </GridItem>
            );
          })}

      {data?.length == 0 && (
        <GridItem colSpan={5}>
          <Flex justifyContent="center">
            <Flex
              gap="4"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              maxW="max-content"
            >
              <Heading textAlign="center" fontSize="md" fontWeight="semibold">
                Không có kết quả
              </Heading>
              <Text textAlign="center" fontSize="sm" fontWeight="semibold">
                Đừng lo, Polytech luôn sẵn sàng tư vấn miễn phí nếu bạn cần hỗ
                trợ thêm
              </Text>
              <Button
                display="inline-flex"
                bgColor="bg.blue"
                maxW="max-content"
              >
                Tư vấn miễn phí
              </Button>
            </Flex>
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};

export default ListThinkPro;

import { Box, Grid, GridItem, Text, Flex, Heading, Wrap, WrapItem, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { IPost } from "~/interface/post";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { addViewedItem } from "~/redux/slices/globalSlice";
import { Link as ReactRouterLink } from "react-router-dom";
import moment from "moment";


type Props = {
  product?: IPost;
};

const AllNewsView = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const handleViewProduct = () => {
    const productData = {
      // productName: "LG Gram 14 2022",
      // price: "19.999.000",
    };
    dispatch(addViewedItem(productData));
  };
 

  const now = moment();
  const diffInSeconds = now.diff(product?.created_at, "seconds");
  const diffInMinutes = Math.ceil(diffInSeconds / 60);
  const diffInHours = Math.ceil(diffInMinutes / 60);
  const diffInDays = Math.ceil(diffInHours / 24);

  return (
    <Link
      to={product?.slug}
      as={ReactRouterLink}
      w="full"
      overflow="hidden"
      rounded="md"
      display="inline-block"
      _hover={{
        textDecoration: "none",
      }}
    >
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
          xl: "repeat(5, 1fr)",
        }}>
        <GridItem colSpan={2}>
          <Box
            rounded="lg"
            overflow="hidden"
            position="relative"
            paddingBottom="55%"
          >
            <Box position="absolute" w="full" h="full">
              <Image
                w="full"
                h="full"
                objectFit="cover"
                src={product?.thumbnail}
              />
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                "& p": {
                  display: "inline",
                },
              }}
            >
              {product?.title}
            </Text>
            <Text
              fontSize="md"
              my="4"
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                "& p": {
                  display: "inline",
                },
              }}
            >
              {product?.description && (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              )}
            </Text>
            <Flex fontSize="sm">
              <Text as="h3" fontWeight="black" lineHeight="1.3">
                {product?.created_by}
              </Text>
              <Text mx={2}>|</Text>
              <Text fontWeight="medium" fontSize="13px">
                {
                  diffInSeconds <= 60 ? (
                    <Text fontWeight="medium" fontSize="13px">
                      {diffInSeconds} giây
                    </Text>
                  ) : (
                    diffInMinutes <= 60 ? (
                      <Text fontWeight="medium" fontSize="13px">
                        {diffInMinutes} phút
                      </Text>
                    ) : (
                      diffInHours <= 24 ? (
                        <Text fontWeight="medium" fontSize="13px">
                          {diffInHours} giờ
                        </Text>
                      ) : (
                        <Text fontWeight="medium" fontSize="13px">
                          {diffInDays} ngày
                        </Text>
                      )
                    )
                  )
                }
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>

    </Link>

  );
}



export default AllNewsView
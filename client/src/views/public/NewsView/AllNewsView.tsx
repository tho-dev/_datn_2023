import {
  Box,
  Grid,
  GridItem,
  Text,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  Link,
} from "@chakra-ui/layout";
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

  const { user } = useAppSelector((state) => state.persistedReducer.global);
  console.log(product);

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
      onClick={handleViewProduct}
    >
      <GridItem colSpan={2}>
        <Box my="6">
          <Grid
            gap={6}
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(2, 1fr)",
            }}
          >
            <GridItem>
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
            <GridItem>
              <Box>
                <Text fontSize="xl" fontWeight="semibold">
                  {product?.title}
                </Text>
                <Text fontSize="md" my="4">
                  {product?.slug}
                </Text>
                <Flex fontSize="sm">
                  <Text as="h3" fontWeight="black" lineHeight="1.3">
                    {user.first_name + " " + user.last_name}
                  </Text>
                  <Text mx={2}>|</Text>
                  <Text fontWeight="medium" fontSize="13px">
                    {moment(product?.created_at).format("DD-MM-YYYY HH:mm:ss")}
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </GridItem>
    </Link>
  );
};

export default AllNewsView;

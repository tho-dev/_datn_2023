import { Box, Grid, GridItem, Text, Flex, Heading, Wrap, WrapItem, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { IPost } from "~/interface/post";
import { useAppDispatch } from "~/redux/hook/hook";
import { addViewedItem } from "~/redux/slices/globalSlice";
import {  Link as ReactRouterLink } from "react-router-dom";


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

    return (
        <Link
            to={product?.slug}
            as={ReactRouterLink}
            w="full" 
            overflow="hidden"
            rounded="md"
            display="inline-block"
            backgroundColor="bg.white"
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
                                <Box
                                    position="absolute"
                                    w="full"
                                    h="full"
                                >
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
                                <Text
                                    fontSize="xl"
                                    fontWeight="semibold"
                                >
                                    {product?.title}
                                </Text>
                                <Text
                                    fontSize="md"
                                    my="4"
                                >
                                    {product?.slug}
                                </Text>
                                <Flex fontSize="sm">
                                    <Text>Nguyen Cong Minh</Text>
                                    <Text mx={2}>|</Text>
                                    <Text>5 ngày</Text>
                                </Flex>
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </GridItem>
        </Link>

    );
}



export default AllNewsView
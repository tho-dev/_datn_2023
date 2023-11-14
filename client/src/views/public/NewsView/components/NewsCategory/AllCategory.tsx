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

const AllCategory = ({ product }: Props) => {
    const dispatch = useAppDispatch();

	const handleViewProduct = () => {
        const productData = {
          // productName: "LG Gram 14 2022",
          // price: "19.999.000",
        };
        dispatch(addViewedItem(productData));
      
        if (product?.slug) {
          window.location.href = product?.slug;
        }
      };


    return (
        <Link
            // to={product?.slug}
            to={`tin-tuc/${product?.slug}`}
            as={ReactRouterLink}
            h="full"
            role="group"
            cursor="pointer"
            rounded="lg"
            overflow="hidden"
            display="inline-flex"
            flexDir="column"
            backgroundColor="bg.white"
            _hover={{
                transition: "all 0.3s ease-in",
                backgroundColor: "bg.blue",
                "& > *": {
                    color: "text.white",  
                },
            }}
            onClick={handleViewProduct}

        >
            <Box>
                <Image
                    src={product?.thumbnail?.url}
                    w="full"
                    h="120px"
                    objectFit="cover"
                />
            </Box>
            <Text
                color="text.black"
                p="3"
                fontSize="md"
                fontWeight="semibold"
            >
                {product?.name}
            </Text>
        </Link>
    );
}



export default AllCategory
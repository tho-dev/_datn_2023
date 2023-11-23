import { Box, Text, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { IPost } from "~/interface/post";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";

type Props = {
  product?: IPost;
};

const AllCategory = ({ product }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleViewProduct = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!clicked) {
      setClicked(true);

      window.location.href = `${product?.slug}`;
    }
  };

  return (
    <Link
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
      <Text color="text.black" p="3" fontSize="md" fontWeight="semibold">
        {product?.name}
      </Text>
    </Link>
  );
};

export default AllCategory;

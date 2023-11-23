import { Image } from "@chakra-ui/react";
import { Box, Text, Link } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";

type Props = {
  product?: any;
};

const PostRelate = ({ product }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleViewProduct = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!clicked) {
      setClicked(true);

      window.location.href = product?.slug;
    }
  };

  return (
    <Link
      as={ReactRouterLink}
      w="full"
      rounded="xl"
      overflow="hidden"
      display="inline-block"
      backgroundColor="bg.white"
      _hover={{
        textDecoration: "none",
      }}
      onClick={handleViewProduct}
    >
      <Box position="relative" w="full" h="full" paddingBottom="55%">
        <Box position="absolute" w="full" h="full">
          <Image w="full" h="full" objectFit="cover" src={product?.thumbnail} />
        </Box>
      </Box>
      <Text p={5} fontSize={16} fontWeight={"semibold"}>
        {product?.title}
      </Text>
    </Link>
  );
};

export default PostRelate;

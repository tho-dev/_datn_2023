import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { IPost } from "~/interface/post";

type Props = {
  product?: IPost;
  category?: string;
  setCategory: any;
};

const AllCategory = ({ product, category, setCategory }: Props) => {
  return (
    <Box
      h="full"
      role="group"
      cursor="pointer"
      rounded="lg"
      overflow="hidden"
      display="inline-flex"
      flexDir="column"
      backgroundColor={category === product?.slug ? "bg.blue" : "bg.white"}
      _hover={{
        transition: "all 0.3s ease-in",
        backgroundColor: "bg.blue",
        "& > *": {
          color: "text.white",
        },
      }}
      onClick={() => setCategory(product?.slug)}
    >
      <Box w={"100%"}>
        <Image
          src={product?.thumbnail?.url}
          w="full"
          h="120px"
          objectFit="cover"
        />
      </Box>
      <Text color="text.black" p="3" fontSize="md" fontWeight="semibold">
        {product?.name == "all" ? "Tất cả" : product?.name}
      </Text>
    </Box>
  );
};

export default AllCategory;

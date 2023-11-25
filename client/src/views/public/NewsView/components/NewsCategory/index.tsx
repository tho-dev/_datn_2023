import { Box, Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import AllCategory from "./AllCategory";
import LoadingPolytech from "~/components/LoadingPolytech";
// import { NewsView } from "../..";

type Props = {
  category: string;
  setCategory: any;
};

const NewsCategory = ({ category, setCategory }: Props) => {
  const { data, isLoading } = useGetAllCategoryQuery({
    _order: "asc",
    _sort: "date",
    _page: 1,
    _limit: 10,
    _type: "category_post",
  });

  if (isLoading) return <LoadingPolytech />;

  return (
    <Box>
      <Heading
        as="h2"
        my="6"
        fontSize="2xl"
        color="text.black"
        fontWeight="bold"
      >
        Tin tức công nghệ
      </Heading>
      <Flex position="relative" gap={4}>
        {data?.data.items.map((product: any, index: number) => {
          return (
            <Box
              w="full"
              h="full"
              overflow="hidden"
              rounded="lg"
              borderColor="border.primary"
            >
              <AllCategory
                product={product}
                key={index}
                category={category}
                setCategory={setCategory}
              />
            </Box>
          );
        })}
        {/* <Flex
					w="9"
					h="9"
					position="absolute"
					left="-4"
					top={"calc(50% - 24px)"}
					translateY="-50%"
					zIndex="5"
					rounded="full"
					cursor="pointer"
					alignItems="center"
					justifyContent="center"
					backgroundColor="bg.bgEdit"
					className="discount__btn-prev"
				>
					<NavArrowLeflIcon
						size={4}
						color="text.textEdit"
					/>
				</Flex>
				<Flex
					w="9"
					h="9"
					position="absolute"
					right="-4"
					top={"calc(50% - 24px)"}
					translateY="-50%"
					zIndex="5"
					rounded="full"
					cursor="pointer"
					alignItems="center"
					justifyContent="center"
					backgroundColor="bg.bgEdit"
					className="discount__btn-next"
				>
					<NavArrowRightIcon
						size={4}
						color="text.textEdit"
					/>
				</Flex> */}
      </Flex>
    </Box>
  );
};

export default NewsCategory;

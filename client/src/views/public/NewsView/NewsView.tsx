import { Box, Grid, GridItem, Text, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/layout";
import NewsCategory from "./components/NewsCategory";
import { Divider, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useGetAllPostQuery } from "~/redux/api/post";
import AllNewsView from "./AllNewsView";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const NewsView = () => {
	const { slug: params } = useParams();
	const [showCompare, setShowCompare] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const { data: posts, isLoading, isFetching } = useGetAllPostQuery({
		_order: "asc",
		_sort: "date",
		_page: currentPage,
		_limit: 5,
		_type: params || ""
	});

	useEffect(() => {
		if (posts) {
			const docs = posts?.data?.items as any;
			setData([...docs]);
		}
	}, [posts]);

	const handleCompare = () => {
		setShowCompare(!showCompare);
	};

	const loadMore = () => {
		if (posts?.data?.paginate?.hasNextPage) {
			setCurrentPage(currentPage + 1);
		}
	};
	// console.log("Data:", data);


	return (
		<Box>
			<NewsCategory />
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

				<GridItem  >
					{data?.map((product: any, index: number) => (
						<AllNewsView product={product} key={index} />
					))}
					<Flex
						justifyContent="center"
						alignItems="center"
						mt="4" 
					>
						<Button
							bg="white"
							color="text.blue"
							fontWeight="bold"
							onClick={loadMore}  
							_hover={{ bg: "gray.200" }}  
						>
							Xem Thêm
						</Button> 
					</Flex>
				</GridItem>
 
			</Grid>
		</Box>
	);
};

export default NewsView;

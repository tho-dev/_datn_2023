import { Box, Grid, Text } from "@chakra-ui/layout";
import { useSearchParams } from "react-router-dom";
import CardThinkPro from "~/components/CardThinkPro";
import LoadingPolytech from "~/components/LoadingPolytech";
import { useGetSearchQuery } from "~/redux/api/product";

type Props = {};

const SearchView = (props: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { data, isFetching } = useGetSearchQuery(
		{
			_page: 1,
			_limit: 1000,
			_keyword: searchParams.get("keyword") as string,
			_sort: "created_at",
			_order: "asc",
		},
		{
			skip: !searchParams.get("keyword"),
		}
	);

	if (isFetching) {
		return <LoadingPolytech />;
	}

	return (
		<Box>
			<Box
				w="100%"
				p="6"
				bg="white"
				my={6}
				borderRadius={12}
			>
				<Box my={1}>
					<Text
						lineHeight="34px"
						fontSize="xl"
						fontWeight="inherit"
						fontFamily="ui-sans-serif"
					>
						Kết quả tìm kiếm cho
						<span style={{ fontStyle: "italic", fontWeight: "600" }}>"{searchParams.get("keyword")}"</span>
					</Text>
					<Text
						fontSize="14px"
						w="100%"
						maxW="600px"
						fontWeight={500}
						lineHeight="150%"
						my="2"
					>
						Tìm thấy {data?.data?.items?.length} sản phẩm
					</Text>
				</Box>
			</Box>

			<Grid
				my={6}
				rowGap="6"
				columnGap="4"
				rounded="xl"
				templateColumns="repeat(5, 1fr)"
			>
				{data?.data?.items?.map((item: any, index: number) => {
					return (
						<CardThinkPro
							key={index}
							product={item}
						/>
					);
				})}
			</Grid>
		</Box>
	);
};

export default SearchView;

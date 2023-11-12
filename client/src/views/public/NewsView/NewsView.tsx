import { Box, Grid, GridItem, Text, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/layout";
import NewsCategory from "./components/NewsCategory";
import { Divider } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useGetAllPostQuery } from "~/redux/api/post";
import AllNewsView from "./AllNewsView";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router";


const NewsView = () => {
	const { slug: params } = useParams();
	// const [slug, setSlug] = useState<string>("");
	const [showCompare, setShowCompare] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);

	const { data: posts } = useGetAllPostQuery({
		_order: "asc",
		_sort: "date",
		_page: 1,
		_limit: 10,
		_type: params || ""  
	});

	useEffect(() => {
		if (posts) {
			const docs = posts?.data?.items as any;
			setData([...data, ...docs]);
		}
	}, [posts]);

	const handleCompare = () => {
		setShowCompare(!showCompare);
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
					xl: "repeat(3, 1fr)",
				}}
			>

				<GridItem colSpan={2}>
					{data?.map((product: any, index: number) => {
						return (
							<AllNewsView product={product} key={index} />
						);
					})}
				</GridItem>

				<GridItem
					colSpan={1}
					h="800px"
					overflowY="auto"
				>
					<Box
						scrollMarginY={3}
						maxH="100%"
					>
						<Heading
							as="h2"
							my="4"
							fontSize="2xl"
							color="text.black"
							fontWeight="semibold"
						>
							Hot nhất trong tuần
						</Heading>
						<Wrap>
							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>
							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>
							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>
							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>

							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>
							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>
							<WrapItem>
								<Box
									backgroundColor="bg.white"
									rounded="lg"
									py="2"
									px="3"
									fontSize="xs"
								>
									lenovo yoga book 9i
								</Box>
							</WrapItem>
						</Wrap>
						<Box>
							<Heading
								as="h2"
								mt="10"
								fontSize="2xl"
								color="text.black"
								fontWeight="semibold"
							>
								Có thể bạn thích
							</Heading>
							<Flex flexDir="column">
								{Array(6)
									.fill(0)
									.map(() => {
										return (
											<Flex
												gap={4}
												mt="6"
											>
												<Box
													w="100px"
													h="100px"
												>
													<Image
														w="100%"
														h="100%"
														objectFit="cover"
														src="https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg"
													/>
												</Box>
												<Box>
													<Text
														fontSize="sm"
														fontWeight="bold"
													>
														Tai nghe chụp tai Marshall Major 4
													</Text>
													<Flex
														my={2}
														alignItems="center"
													>
														<Text
															fontSize="lg"
															color="text.red"
															fontWeight="bold"
														>
															3.249.000
														</Text>
														<Text
															ml={2}
															fontSize="md"
															textDecoration="line-through"
														>
															3.999.000
														</Text>
														<Text
															rounded="sm"
															ml="2"
															color="text.white"
															px="1"
															py="2px"
															fontSize="xs"
															textAlign="center"
															backgroundColor="bg.red"
														>
															-18%
														</Text>
													</Flex>
													<Flex alignItems="center">
														<Text
															color="text.slate"
															fontSize="sm"
															fontWeight="semibold"
														>
															Màu
														</Text>
														<Box
															h="4"
															rounded="sm"
															w="4"
															ml="2"
															backgroundColor="bg.blue"
														></Box>
													</Flex>
												</Box>
											</Flex>
										);
									})}
							</Flex>
						</Box>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default NewsView;

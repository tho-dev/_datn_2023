import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image, Img } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import PostRelate from "./components/PostRelate";
import { Grid, GridItem } from "@chakra-ui/layout";
import { useGetAllPostQuery, useGetSinglePostQuery } from "~/redux/api/post";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import moment from "moment";
import { useAppSelector } from "~/redux/hook/hook";

type Props = {
	mt?: any;
	columns?: any;
};

const ContentView = ({ columns = 4 }: Props) => {
	const { slug } = useParams();
	const { data: product, isError, isFetching } = useGetSinglePostQuery(slug as string);


	// const { slug: params } = useParams();
	const [slugs, setSlug] = useState<string>("");
	const [showCompare, setShowCompare] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);


	const { data: posts } = useGetAllPostQuery({
		_order: "asc",
		_sort: "date",
		_page: 1,
		_limit: 10,
		_type: slugs || ""
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

	const { user } = useAppSelector((state) => state.persistedReducer.global);

	return (
		<>
			<Box my="6">
				<Box
					bg="white"
					w="100%"
					borderRadius="2xl"
					py={{
						sm: "6",
						lg: "9",
					}}
					px={{
						sm: "10",
						md: "10",
						lg: "28",
						xl: "28",
					}}
				>
					<Text
						fontSize={"3xl"}
						fontWeight={"bold"}
						py={5}
					>
						{product?.data.title}
					</Text>
					<Box py={5}>
						<Divider />
						<Flex
							my={"4"}
							fontWeight={"bold"}
						>
							<Text as="h3" fontWeight="black" lineHeight="1.3">
								{user.first_name + " " + user.last_name}
							</Text>
							<Text mx={2}>|</Text>
							<Text fontWeight="medium" fontSize="15px">
								{moment(product?.created_at).format("DD-MM-YYYY HH:mm:ss")}
							</Text>
						</Flex>
						<Divider />
					</Box>
					<Box py={5}>
						<Flex fontSize={"xl"}>
							<Text
								color={"blue.600"}
								fontWeight={"extrabold"}
							>
								//{" "}
							</Text>
							<Text color={"black"} as="cite">
								<div dangerouslySetInnerHTML={{ __html: product?.data.description }} />
							</Text>

						</Flex>
					</Box>
					<Text py={5} fontSize={"xl"} fontWeight={"medium"}>
						<div dangerouslySetInnerHTML={{ __html: product?.data.content }} />
					</Text>

					<Box py={5}>
						<img src={product?.data.thumbnail.url} alt="Thumbnail" width="100%" />
					</Box>

					<Text py={5} fontSize={"xl"} fontWeight={"medium"}>
						<div dangerouslySetInnerHTML={{ __html: product?.data.meta_keyword }} />
					</Text>

					<Text py={5} fontSize={"xl"} fontWeight={"medium"}>
						<div dangerouslySetInnerHTML={{ __html: product?.data.meta_description }} />
					</Text>

					<Text py={5} fontSize={"xl"} fontWeight={"medium"}>
						<div dangerouslySetInnerHTML={{ __html: product?.data.meta_title }} />
					</Text>

				</Box>


				<Text
					py={10}
					fontSize={"2xl"}
					fontWeight={"bold"}
				>
					Bài viết liên quan
				</Text>
				<Flex position="relative">
					<Swiper
						modules={[Navigation]}
						speed={400}
						spaceBetween={16}
						loop={true}
						navigation={{
							nextEl: ".discount__btn-next",
							prevEl: ".discount__btn-prev",
						}}
						breakpoints={{
							0: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 3,
							},
							1200: {
								slidesPerView: 5,
							},
						}}
					>
						{data?.map((product: any, index: number) => {
							return (
								<SwiperSlide key={index}>
									<Box
										w="full"
										h="full"
										overflow="hidden"
										rounded="lg"
										borderWidth="1px"
										borderColor="border.primary"
									>
										<PostRelate product={product} key={index} />
									</Box>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<Flex
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
					</Flex>
				</Flex>
			</Box>
		</>
	);
};

export default ContentView;

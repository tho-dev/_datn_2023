import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, Text, Heading } from "@chakra-ui/layout";
import { Image, color } from "@chakra-ui/react";
import { Navigation } from "swiper/modules";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { useEffect, useState } from "react";
import AllCategory from "./AllCategory";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
// import { NewsView } from "../..";


const NewsCategory = () => {
	const [showCompare, setShowCompare] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);


	const { data: posts } = useGetAllCategoryQuery({
		_order: "asc",
		_sort: "date",
		_page: 1,
		_limit: 10,
		_type: "category_post"
	});

	useEffect(() => {
		if (posts) {
			const docs = posts?.data?.items as any;
			setData([...data, ...docs]);
		}
	}, [posts]);

	// console.log(data);

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
									borderColor="border.primary"
								>
									<AllCategory product={product} key={index} />
								</Box>
							</SwiperSlide>
						);
					})}


				</Swiper>
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

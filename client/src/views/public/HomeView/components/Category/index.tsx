import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Image } from "@chakra-ui/react";

type Props = {
	title?: string;
	items?: any;
};

const Category = ({ title, items }: Props) => {
	return (
		<Box pt="12">
			<Heading
				as="h2"
				fontSize="28px"
			>
				{title}
			</Heading>
			<Box
				mt="5"
				py="6"
				rounded="md"
				backgroundColor="bg.white"
			>
				<Box
					px="9"
					position="relative"
				>
					<Swiper
						modules={[Navigation]}
						speed={400}
						slidesPerView={8}
						spaceBetween={16}
						loop={true}
						navigation={{
							nextEl: ".btn-next",
							prevEl: ".btn-prev",
						}}
						breakpoints={{
							0: {
								slidesPerView: 2,
								spaceBetween: 8,
							},
							768: {
								slidesPerView: 4,
							},
							1200: {
								slidesPerView: 8,
							},
						}}
					>
						{items?.map((item: any, index: number) => {
							return (
								<SwiperSlide key={index}>
									<Link
										to={`/${item?.shared_url}`}
										as={ReactRouterLink}
										w="full"
										px="4"
										py="2"
										rounded="lg"
										display="inline-flex"
										alignItems="center"
										flexDir="column"
										_hover={{
											transition: "all 0.3s ease-in",
											textDecoration: "none",
											backgroundColor: "bg.gray",
										}}
									>
										<Box>
											<Image
												src={item?.thumbnail}
												w="96px"
												h="96px"
												objectFit="cover"
											/>
										</Box>
										<Text
											mt="2"
											color="text.black"
											fontSize="sm"
											fontWeight="semibold"
											textAlign="center"
										>
											{item?.name.length > 10 ? `${item?.name.slice(0, 10)}...` : item?.name}
										</Text>
										<Text
											mt="1"
											color="text.black"
											fontSize="xs"
											fontWeight="medium"
											textAlign="center"
										>
											{item?.total} sản phẩm
										</Text>
									</Link>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<Flex
						w="9"
						h="9"
						position="absolute"
						left="4"
						top={"calc(50% - 24px)"}
						translateY="-50%"
						zIndex="5"
						rounded="full"
						cursor="pointer"
						alignItems="center"
						justifyContent="center"
						backgroundColor="bg.gray"
						className="btn-prev"
					>
						<NavArrowLeflIcon
							size={4}
							strokeWidth={3}
							color="text.black"
						/>
					</Flex>
					<Flex
						w="9"
						h="9"
						position="absolute"
						right="4"
						top={"calc(50% - 24px)"}
						translateY="-50%"
						zIndex="5"
						rounded="full"
						cursor="pointer"
						alignItems="center"
						justifyContent="center"
						backgroundColor="bg.gray"
						className="btn-next"
					>
						<NavArrowRightIcon
							size={4}
							strokeWidth={3}
							color="text.black"
						/>
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

export default Category;

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";

type Props = {
	items: any;
};

const Categories = ({ items }: Props) => {
	return (
		<>
			<Swiper
				modules={[Navigation]}
				slidesPerView="auto"
				spaceBetween={8}
				navigation={{
					nextEl: `.btn-next-menu`,
					prevEl: `.btn-prev-menu`,
				}}
			>
				{items?.map((item: any, index: number) => {
					return (
						<SwiperSlide
							style={{
								width: "auto",
							}}
							key={index}
						>
							<Link
								to="/slug"
								as={ReactRouterLink}
								display="inline-flex"
								gap="3"
								px="3"
								py="2"
								rounded="md"
								alignItems="center"
								transition="all 0.2s ease-in"
								_hover={{
									bgColor: "bg.gray",
								}}
							>
								<Box
									w="48px"
									h="48px"
								>
									<Image
										w="full"
										h="full"
										objectFit="cover"
										src={item?.thumbnail?.path}
									/>
								</Box>
								<Text
									fontSize="sm"
									color="text.black"
									fontWeight="semibold"
								>
									{item?.name}
								</Text>
							</Link>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<Flex
				gap="2"
				display={{
					sm: "none",
					lg: "flex",
				}}
			>
				<Flex
					w="9"
					h="9"
					rounded="full"
					cursor="pointer"
					alignItems="center"
					justifyContent="center"
					backgroundColor="bg.white"
					className="btn-prev-menu"
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
					rounded="full"
					cursor="pointer"
					alignItems="center"
					justifyContent="center"
					backgroundColor="bg.white"
					className="btn-next-menu"
				>
					<NavArrowRightIcon
						size={4}
						strokeWidth={3}
						color="text.black"
					/>
				</Flex>
			</Flex>
		</>
	);
};

export default Categories;

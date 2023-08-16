import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavArrowLeflIcon, NavArrowRightIcon } from "../common/Icons";

type Props = {
	mt?: any; // khoảng cái margin-top
	items?: any; // ....
	isArrow?: any; // hiển thị nút
	nextEl: string; // className của nút next
	prevEl: string; // className của nút prev
};

const ScrollableThinkPro = ({ items = [], mt = 4, isArrow = false, nextEl, prevEl }: Props) => {
	return (
		<Flex
			mt={mt}
			gap="4"
		>
			<Swiper
				modules={[Navigation]}
				slidesPerView="auto"
				spaceBetween={8}
				navigation={{
					nextEl: `.${nextEl}`,
					prevEl: `.${prevEl}`,
				}}
			>
				{items?.map((item: any, index: number) => {
					return (
						<SwiperSlide
							key={index}
							style={{
								width: "auto",
							}}
						>
							<Link
								to="/"
								as={ReactRouterLink}
								_hover={{
									textDecoration: "none",
								}}
							>
								<Button
									h="auto"
									px="4"
									py="3"
									size="small"
									lineHeight="150%"
									rounded="lg"
									color="text.black"
									backgroundColor="bg.white"
								>
									{item?.name}
								</Button>
							</Link>
						</SwiperSlide>
					);
				})}
			</Swiper>
			{isArrow && (
				<Flex gap="2">
					<Flex
						w="9"
						h="9"
						rounded="full"
						cursor="pointer"
						alignItems="center"
						justifyContent="center"
						backgroundColor="bg.white"
						className={prevEl}
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
						className={nextEl}
					>
						<NavArrowRightIcon
							size={4}
							strokeWidth={3}
							color="text.black"
						/>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default ScrollableThinkPro;

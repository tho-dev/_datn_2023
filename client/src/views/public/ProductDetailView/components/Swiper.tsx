import { Box, Flex, Grid, GridItem, LinkBox, Spacer, Text } from "@chakra-ui/layout";
import { Image, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, FreeMode, Mousewheel, Navigation, Pagination, Scrollbar, Thumbs } from "swiper/modules";
import { Link } from "react-router-dom";
const SwiperProduct = () => {
	const data = {
		name: "Bàn phím",
		slug: "ban-phim",
		thumbnail: {
			path: "https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573390/thinkpro/categories/owmv3uyns2zjpgbs6thb.png",
			filename: "thinkpro/categories/owmv3uyns2zjpgbs6thb",
		},
	};
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	return (
		<Box>
			<Swiper
				modules={[Navigation]}
				speed={400}
				slidesPerView={1}
				spaceBetween={16}
				loop={true}
				navigation={{
					nextEl: ".btn-next",
					prevEl: ".btn-prev",
				}}
			>
				<SwiperSlide key={1}>
					<LinkBox
						as={"a"}
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
							<Image src={"https://picsum.photos/200/300.jpg"} w={"full"} h={"full"} objectFit="cover" />
						</Box>

						<Text mt="1" color="text.black" fontSize="xs" fontWeight="medium" textAlign="center">
							125 san pham
						</Text>
					</LinkBox>
				</SwiperSlide>
				<SwiperSlide key={1}>
					<LinkBox
						as={"a"}
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
							<Image src={"https://picsum.photos/200/300.jpg"} w={"full"} h={"full"} objectFit="cover" />
						</Box>

						<Text mt="1" color="text.black" fontSize="xs" fontWeight="medium" textAlign="center">
							125 san pham
						</Text>
					</LinkBox>
				</SwiperSlide>
				<SwiperSlide key={1}>
					<LinkBox
						as={"a"}
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
							<Image src={"https://picsum.photos/200/300.jpg"} w={"full"} h={"full"} objectFit="cover" />
						</Box>

						<Text mt="1" color="text.black" fontSize="xs" fontWeight="medium" textAlign="center">
							125 san pham
						</Text>
					</LinkBox>
				</SwiperSlide>
			</Swiper>
		</Box>
	);
};

export default SwiperProduct;

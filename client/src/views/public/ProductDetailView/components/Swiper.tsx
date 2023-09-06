import { Image, Img } from "@chakra-ui/react";
import { Flex, Grid, Box } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
function Gallery() {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const swiperRef = useRef<any>(null);

	// Hàm để di chuyển đến slide trước
	const previousSlide = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	// Hàm để di chuyển đến slide kế tiếp
	const nextSlide = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slideNext();
		}
	};
	return (
		<Flex backgroundColor={"white"} borderRadius={"6px"} py={5} px={5}>
			<Box w={"30%"} display={{ base: "none", md: "block" }}>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode, Thumbs]}
					onSwiper={(swiper) => setThumbsSwiper(swiper)}
					direction="vertical"
					mousewheel={true}
					slidesPerView={4}
					watchSlidesProgress={true}
					spaceBetween={10}
					style={{
						maxHeight: "548px",
					}}
				>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
					<SwiperSlide>
						<Box w={"90px"} h={"90px"}>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} h={"full"} />
						</Box>
					</SwiperSlide>
				</Swiper>
			</Box>
			{thumbsSwiper && (
				<Box w={"80%"}>
					<Swiper
						spaceBetween={10}
						modules={[Navigation, FreeMode, Thumbs]}
						thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
						watchSlidesProgress={true}
						slidesPerView={1}
						style={{
							maxHeight: "548px",
						}}
						navigation={false}
						ref={swiperRef}
					>
						<SwiperSlide>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} />
						</SwiperSlide>
						<SwiperSlide>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} />
						</SwiperSlide>
						<SwiperSlide>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} />
						</SwiperSlide>
						<SwiperSlide>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} />
						</SwiperSlide>
						<SwiperSlide>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} />
						</SwiperSlide>
						<SwiperSlide>
							<Img src="https://picsum.photos/200/300.jpg" w={"full"} />
						</SwiperSlide>
					</Swiper>
					<Flex justifyContent={"end"} mt={"2"}>
						<Flex
							w="9"
							h="9"
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
							onClick={previousSlide}
						>
							<NavArrowLeflIcon size={4} strokeWidth={3} color="text.black" />
						</Flex>
						<Flex
							w="9"
							h="9"
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
							onClick={nextSlide}
						>
							<NavArrowRightIcon size={4} strokeWidth={3} color="text.black" />
						</Flex>
					</Flex>
				</Box>
			)}
		</Flex>
	);
}

export default Gallery;

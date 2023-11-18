import { Img, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Image } from "@chakra-ui/react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./index.css";

type Props = {
	onClose: any;
	isOpen: any;
	products: any;
	name: string;
};

function ImagePreviewModal({ onClose, isOpen, products, name }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const swiperRef = useRef<any>(null);

	return (
		<Box overflow={"hidden"}>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				size={"full"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<Box>
							<Text
								fontWeight={"bold"}
								fontSize={"20px"}
							>
								{name}
							</Text>
						</Box>
						<Flex
							p="6"
							rounded="6px"
							bgColor="bg.white"
							justifyContent="space-between"
						>
							{thumbsSwiper && (
								<Flex
									w="90%"
									maxH={"90vh"}
								>
									<Swiper
										speed={600}
										spaceBetween={10}
										modules={[Navigation, FreeMode, Thumbs, Zoom]}
										thumbs={{
											swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
										}}
										watchSlidesProgress={true}
										slidesPerView={1}
										navigation={false}
										ref={swiperRef}
										zoom={true}
									>
										{products.map((item: any, index: number) => {
											return (
												<SwiperSlide key={index}>
													<Box
														w="full"
														h="full"
														bgColor="bg.gray"
														rounded="6px"
														overflow="hidden"
													>
														<Flex
															w="full"
															h="full"
															className="swiper-zoom-container"
															justifyContent={"center"}
														>
															<Img
																src={item?.url}
																objectFit="contain"
																cursor={"pointer"}
															/>
														</Flex>
													</Box>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</Flex>
							)}
							<Box
								w="100px"
								display={{ base: "none", md: "block" }}
								__css={{
									"& .swiper-slide-thumb-active": {
										borderStyle: "solid",
										borderWidth: "1px",
										borderColor: "bg.blue",
										rounded: "md",
									},
								}}
							>
								<Swiper
									modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode, Thumbs]}
									onSwiper={(swiper) => setThumbsSwiper(swiper)}
									direction="vertical"
									mousewheel={true}
									slidesPerView={4}
									watchSlidesProgress={true}
									spaceBetween={10}
									speed={600}
								>
									{products.map((item: any, index: number) => {
										return (
											<SwiperSlide
												className="slide"
												style={{
													height: "100px",
												}}
												key={index}
											>
												<Box
													w="full"
													h="full"
													cursor="pointer"
													rounded="6px"
													overflow="hidden"
												>
													<Img
														src={item?.url}
														w={"full"}
														h={"full"}
														objectFit="cover"
													/>
												</Box>
											</SwiperSlide>
										);
									})}
								</Swiper>
							</Box>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default ImagePreviewModal;

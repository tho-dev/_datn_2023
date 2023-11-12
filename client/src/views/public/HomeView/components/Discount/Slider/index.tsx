import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Image } from "@chakra-ui/react";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";
import { formatNumber } from "~/utils/fc";
import moment from "moment/moment";

type PropTypes = {
	title: any;
};

const Slider = ({ title }: PropTypes) => {
	const { homeSettings } = useAppSelector((state: RootState) => state.persistedReducer.global);

	return (
		<Box
			px="9"
			mb={12}
		>
			<Heading
				as="h2"
				fontSize="28px"
				mb={6}
			>
				{title}
			</Heading>
			<Flex position="relative">
				<Swiper
					modules={[Navigation]}
					speed={400}
					spaceBetween={16}
					navigation={{
						nextEl: ".discount__btn-next",
						prevEl: ".discount__btn-prev",
					}}
					breakpoints={{
						0: {
							slidesPerView: 1,
							spaceBetween: 8,
						},
						768: {
							slidesPerView: 2.2,
						},
						1200: {
							slidesPerView: 2.2,
						},
					}}
				>
					{homeSettings?.promotions?.items?.map((item: any, index: number) => {
						return (
							<SwiperSlide key={index}>
								<Link
									as={ReactRouterLink}
									to={`/khuyen-mai/${item?.slug}`}
									w="full"
									h="full"
									rounded="lg"
									display="inline-flex"
									flexDir="column"
									backgroundColor="bg.white"
									_hover={{
										transition: "all 0.3s ease-in",
										textDecoration: "none",
									}}
								>
									<Flex
										flexDir="column"
										gap={1}
										p={4}
										alignItems="inherit"
										justifyContent="space-between"
										h="full"
									>
										<Text
											mt="2"
											color="text.black"
											fontSize="xl"
											fontWeight="semibold"
										>
											{item?.name}
										</Text>
										<Flex color="text.darkPink">
											<Box
												fontSize="xs"
												px={2}
												py={0.5}
												backgroundColor="bg.lightGray"
												mr={2}
												rounded="md"
												fontWeight="semibold"
											>
												{`-${item?.max_percent}%`}
											</Box>
											<Box
												fontSize="xs"
												px={2}
												py={0.5}
												backgroundColor="bg.lightGray"
												mr={2}
												rounded="md"
												fontWeight="semibold"
											>
												{`Chỉ từ ${formatNumber(`${item?.min_sale_price}`)}đ`}
											</Box>
										</Flex>
										<Text
											mt="2"
											color="text.black"
											fontSize="xs"
											fontWeight="semibold"
										>
											{`Từ ${moment(item?.start_time).format("DD-MM-YYYY")} đến ${moment(
												item?.expired_time
											).format("DD-MM-YYYY")}`}
										</Text>
										<Flex
											justifyContent="space-between"
											gap={1}
										>
											{item?.items?.slice(0, 5)?.map((x: any, i: number) => {
												return (
													<Box key={i}>
														<Image
															src={x?.image}
															minW="66px"
															h="66px"
															p={2}
															objectFit="cover"
															border="1px"
															borderColor="bg.gray"
															rounded="md"
														/>
													</Box>
												);
											})}

											{/* Box cuối cùng */}
											<Box pos="relative">
												<Image
													src={item?.items?.slice(5, 6)[0]?.image}
													minW="66px"
													h="66px"
													p={2}
													objectFit="cover"
													border="1px"
													borderColor="bg.gray"
													rounded="md"
												/>
												<Flex
													justifyContent="center"
													alignItems="center"
													opacity={0.4}
													minW="66px"
													h="66px"
													pos="absolute"
													top="0"
													rounded="md"
													bgColor="bg.black"
												></Flex>
												<Flex
													justifyContent="center"
													alignItems="center"
													minW="66px"
													h="66px"
													pos="absolute"
													top="0"
													rounded="13px"
													color="text.white"
													fontWeight="semibold"
												>
													{`+${item?.items?.slice(6)?.length}`}
												</Flex>
											</Box>
										</Flex>
									</Flex>
								</Link>
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
					backgroundColor="bg.gray"
					className="discount__btn-prev"
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
					right="-4"
					top={"calc(50% - 24px)"}
					translateY="-50%"
					zIndex="5"
					rounded="full"
					cursor="pointer"
					alignItems="center"
					justifyContent="center"
					backgroundColor="bg.gray"
					className="discount__btn-next"
				>
					<NavArrowRightIcon
						size={4}
						strokeWidth={3}
						color="text.black"
					/>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Slider;

import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import emptybox from "~/assets/images/7486754.png";
import { formatNumber } from "~/utils/fc";

type Props = {
	data: any;
};

const Cart = ({ data }: Props) => {
	return (
		<Box
			w="500px"
			rounded="md"
			borderWidth="1px"
			borderColor="#E2E8F0"
			borderStyle="solid"
			bgColor="bg.white"
		>
			<Flex
				p="5"
				fontSize="sm"
				fontWeight="semibold"
				justifyContent="space-between"
				borderBottom="1px solid #e2e8f0"
			>
				<Text color="text.black">{data ? data?.products?.length : 0} sản phẩm</Text>
				<Link
					to="gio-hang"
					as={ReactRouterLink}
					color="text.blue"
				>
					Xem tất cả
				</Link>
			</Flex>
			<Flex
				px="4"
				mt="4"
				flexDirection="column"
			>
				{data?.products?.length > 0 ? (
					data?.products.map((product: any, index: number) => {
						return (
							<Flex
								key={index}
								w="full"
								mb="3"
								pb="3"
								position="relative"
								role="group"
								borderBottom="1px solid #e2e8f0"
							>
								<Box
									w="74px"
									h="74px"
									position="relative"
									rounded="md"
									overflow="hidden"
									borderWidth="1px"
									borderColor="border.primary"
								>
									<Image
										w="full"
										h="full"
										objectFit="cover"
										borderRadius="md"
										src={product?.image?.url}
									/>
									<Box
										position="absolute"
										right="0"
										top="0"
										px="2px"
										fontSize="12px"
										color="text.red"
										fontWeight="semibold"
									>
										x{product?.quantity}
									</Box>
								</Box>
								<Flex
									flex="1"
									ml="4"
									fontSize="md"
									flexDirection="column"
								>
									<Link
										to={product?.shared_url}
										as={ReactRouterLink}
										color="text.black"
									>
										<Text
											fontSize="sm"
											color="text.black"
											fontWeight="semibold"
											css={{
												display: "-webkit-box",
												WebkitLineClamp: 1,
												WebkitBoxOrient: "vertical",
												overflow: "hidden",
											}}
										>
											{product?.name}
										</Text>
									</Link>

									<Flex
										mt="1"
										gap="2"
									>
										{product.option_value.map((_x: any, i: number) => {
											return (
												<Text
													key={i}
													as={"p"}
													fontSize={"11px"}
													px="3"
													py="1"
													rounded="full"
													fontWeight="semibold"
													borderWidth="1px"
													borderColor="#eef1f6"
													boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
													css={{
														display: "-webkit-box",
														WebkitLineClamp: 1,
														WebkitBoxOrient: "vertical",
														overflow: "hidden",
													}}
												>
													{_x}
												</Text>
											);
										})}
									</Flex>
									<Flex
										gap="2"
										fontSize="13px"
										color="text.black"
										fontWeight="semibold"
										mt="1"
									>
										<Text
											as="span"
											color="text.red"
										>
											{formatNumber(`${product?.price}`)}
										</Text>
										<Text
											as="span"
											textDecoration="line-through"
										>
											{formatNumber(`${product?.price_before_discount}`)}
										</Text>
									</Flex>
								</Flex>
								{/* <Box
                  position="absolute"
                  right="0"
                  display="inline-flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  visibility="hidden"
                  transform="all 0.25s ease-in"
                  _groupHover={{
                    visibility: "visible",
                  }}
                >
                  <CloseSmallIcon size={4} />
                </Box> */}
							</Flex>
						);
					})
				) : (
					<Box>
						<Flex
							justifyContent={"center"}
							alignItems="center"
							flexDirection="column"
						>
							<Image
								src={emptybox}
								w={{
									xl: "120px",
									sm: "70px",
								}}
								h={{
									xl: "120px",
									sm: "70px",
								}}
								objectFit={"cover"}
							/>
							<Text
								fontSize={"18px"}
								lineHeight={"150%"}
								fontWeight={600}
								my={"12px"}
							>
								Giỏ hàng trống{" "}
							</Text>
						</Flex>
					</Box>
				)}
			</Flex>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				fontWeight="semibold"
				color="text.black"
				px="5"
				pt="1"
				pb="3"
			>
				<Text fontSize="md">Tổng tiền:</Text>
				<Text
					fontSize="lg"
					fontWeight="bold"
					color="text.red"
				>
					{data?.products?.length > 0 ? formatNumber(`${data?.total_money}`) : 0}đ
				</Text>
			</Flex>
		</Box>
	);
};

export default Cart;

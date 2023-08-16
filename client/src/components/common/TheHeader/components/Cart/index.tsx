import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { CloseSmallIcon } from "~/components/common/Icons";

type Props = {};

const Cart = (props: Props) => {
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
				<Text color="text.black">5 sản phẩm</Text>
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
				flexDirection="column"
			>
				<Flex
					w="full"
					my="3"
					position="relative"
					role="group"
					borderBottom="1px solid #e2e8f0"
				>
					<Box
						w="86px"
						h="86px"
						ml="3"
						position="relative"
					>
						<Image
							w="full"
							h="full"
							objectFit="cover"
							borderRadius="md"
							src="https://images.thinkgroup.vn/unsafe/172x172/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/23/GT-Chair-Davry-Ivino-GII-01.png"
						/>
						<Box
							position="absolute"
							top="0"
							px="2px"
							bgColor="bg.gray"
							fontSize="sm"
							color="text.black"
							rounded="sm"
							fontWeight="semibold"
						>
							x2
						</Box>
					</Box>
					<Flex
						ml="4"
						fontSize="md"
						flexDirection="column"
					>
						<Text
							fontSize="sm"
							color="text.black"
							fontWeight="semibold"
							css={{
								display: "-webkit-block",
								maxWidth: "100%",
								maxHeight: "74px",
								WebkitLineClamp: 3,
								WebkitBoxOrient: "vertical",
								visibility: "visible",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}

							// display: -webkit-box;
							// line-height: 16px; /* Fallback  */
							// max-height: 74px; /* Fallback số dòng bạn muốn giới hạn */
							// -webkit-line-clamp: 3; /* Số dòng bạn muốn giới hạn */
							// -webkit-box-orient: vertical;
							// visibility: visible;
							// text-overflow: ellipsis;
							// overflow:hidden;
							// max-width: 300px;
						>
							Ghế Công Thái Học GT Chair Davry Ivino Gen II bbbbbbbbbbbbbbbbbbb
						</Text>
						<Text
							mt="1"
							fontSize="xs"
							color="text.black"
							fontWeight="medium"
						>
							Màu:
						</Text>
						<Flex
							gap="2"
							fontSize="xs"
							color="text.black"
							fontWeight="semibold"
							mt="1"
						>
							<Text
								as="span"
								color="text.red"
							>
								9.000.000
							</Text>
							<Text
								as="span"
								textDecoration="line-through"
							>
								8.999.999
							</Text>
						</Flex>
					</Flex>
					<Box
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
					</Box>
				</Flex>
				<Flex
					w="full"
					my="3"
					position="relative"
					role="group"
					borderBottom="1px solid #e2e8f0"
				>
					<Box
						w="86px"
						h="86px"
						ml="3"
						position="relative"
					>
						<Image
							w="full"
							h="full"
							objectFit="cover"
							borderRadius="md"
							src="https://images.thinkgroup.vn/unsafe/172x172/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/23/GT-Chair-Davry-Ivino-GII-01.png"
						/>
						<Box
							position="absolute"
							top="0"
							px="2px"
							bgColor="bg.gray"
							fontSize="sm"
							color="text.black"
							rounded="sm"
							fontWeight="semibold"
						>
							x2
						</Box>
					</Box>
					<Flex
						ml="4"
						fontSize="md"
						flexDirection="column"
					>
						<Text
							fontSize="sm"
							color="text.black"
							fontWeight="semibold"
						>
							Ghế Công Thái Học GT Chair Davry Ivino Gen II
						</Text>
						<Text
							mt="1"
							fontSize="xs"
							color="text.black"
							fontWeight="medium"
						>
							Màu:
						</Text>
						<Flex
							gap="2"
							fontSize="xs"
							color="text.black"
							fontWeight="semibold"
							mt="1"
						>
							<Text
								as="span"
								color="text.red"
							>
								9.000.000
							</Text>
							<Text
								as="span"
								textDecoration="line-through"
							>
								8.999.999
							</Text>
						</Flex>
					</Flex>
					<Box
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
					</Box>
				</Flex>
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
				<Text fontSize="sm">Tổng tiền:</Text>
				<Text fontSize="xl">6.000.000</Text>
			</Flex>
		</Box>
	);
};

export default Cart;

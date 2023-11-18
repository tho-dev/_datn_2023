import React from "react";
import usp1 from "~/assets/images/usp-1.png";
import usp2 from "~/assets/images/usp-2.png";
import usp3 from "~/assets/images/usp-3.png";
import usp4 from "~/assets/images/usp-4.png";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Link, Text } from "@chakra-ui/layout";
import { ArrowRightIcon, ArrowRightUpIcon } from "~/components/common/Icons";
import { Image } from "@chakra-ui/react";

type Props = {
	items?: any;
	category?: any;
};

// Quyền lợi
const usps: any = [
	{
		title: "Trải nghiệm thực tế sản phẩm trước khi mua",
		image: usp1,
		color: "#faf4ff",
	},
	{
		title: "Chuyên gia tư vấn sản phẩm",
		image: usp2,
		color: "#feeecc",
	},
	{
		title: "Trung tâm bảo vệ quyền lợi khách hàng",
		image: usp3,
		color: "#cbe7fe",
	},
	{
		title: "Cửa hàng bán lẻ Phục vụ khách hàng lâu nhất",
		image: usp4,
		color: "#fbcfd8",
	},
];

const Filter = ({ items, category }: Props) => {
	return (
		<>
			<Box
				flex="1"
				px="6"
				py="5"
				bgColor="bg.gray"
				rounded="md"
				maxH="auto"
			>
				<Link
					to={`/${category?.shared_url}`}
					as={ReactRouterLink}
					fontSize="md"
					color="text.blue"
					fontWeight="semibold"
					display="inline-flex"
					gap="1"
					alignItems="center"
					_hover={{
						textDecoration: "none",
					}}
				>
					<Text as="span">Xem tất cả</Text>
					<Text as="span">{category?.name}</Text>
					<ArrowRightIcon size={5} />
				</Link>
				<Flex
					mt="3"
					gap={{
						sm: 3,
						lg: 0,
					}}
					flexDirection={{
						sm: "column",
						lg: "row",
					}}
				>
					<Flex
						flex="1"
						flexDir="column"
					>
						<Text
							fontSize="md"
							color="text.black"
							fontWeight="semibold"
						>
							Hoặc chọn {category?.name} theo thương hiệu
						</Text>
						<Grid
							mt="3"
							gap="1"
							templateColumns={{
								sm: "repeat(1, 1fr)",
								lg: "repeat(3, 1fr)",
							}}
						>
							{items?.map((item: any, index: number) => {
								return (
									<GridItem
										key={index}
										display="flex"
										justifyContent="flex-start"
									>
										<Link
											as={ReactRouterLink}
											to={`/${item?.shared_url}`}
											display="inline-flex"
											gap="1"
											fontSize="sm"
											color="text.black"
											fontWeight="medium"
											_hover={{
												textDecoration: "none",
											}}
										>
											<Text as="span">{item?.name}</Text>
											<Box>
												<ArrowRightUpIcon
													size={4}
													color="text.blue"
													strokeWidth={2}
												/>
											</Box>
										</Link>
									</GridItem>
								);
							})}
						</Grid>
					</Flex>
				</Flex>
			</Box>
			<Flex
				w={{
					sm: "full",
					lg: "270px",
				}}
				gap="3"
				flexDirection="column"
			>
				{usps?.map((item: any, index: number) => {
					return (
						<Box
							key={index}
							w="full"
							h="115px"
							p="4"
							rounded="md"
							position="relative"
							bgColor={item?.color}
						>
							<Text
								fontSize="sm"
								fontWeight="semibold"
								lineHeight="150%"
								color="text.black"
								maxW="140px"
							>
								{item?.title}
							</Text>
							<Box
								w="20"
								h="20"
								position="absolute"
								right="4"
								bottom="4"
							>
								<Image
									src={item?.image}
									w="full"
									h="full"
									objectFit="cover"
								/>
							</Box>
						</Box>
					);
				})}
			</Flex>
		</>
	);
};

export default Filter;

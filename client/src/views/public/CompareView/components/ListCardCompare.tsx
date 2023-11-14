import { Box, Grid, GridItem, Flex, Text, Button, useDisclosure, Heading, Checkbox } from "@chakra-ui/react";
import React from "react";
import CardCompare from "./CardCompare";
import { PlusIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import ListThinkPro from "~/components/ListThinkPro";
import { Link } from "react-router-dom";

type Props = {
	items: any;
};

const ListCardCompare = ({ items }: Props) => {
	return (
		<>
			<Flex
				gap={4}
				minHeight="400px"
			>
				<Box w="240px">
					<Text
						fontWeight="bold"
						fontSize="24px"
					>
						So sánh {items?.length} sản phẩm
					</Text>
					<Box mt="10px">
						{items?.map((item: any, index: number) => {
							return (
								<Text
									key={index}
									fontSize="13px"
									lineHeight={6}
									fontWeight="semibold"
									css={{
										display: "-webkit-box",
										WebkitLineClamp: 1,
										WebkitBoxOrient: "vertical",
										overflow: "hidden",
									}}
								>
									{index + 1}. {item?.name}
								</Text>
							);
						})}
					</Box>
					<Flex
						gap="2"
						mt="5"
						alignItems="center"
					>
						<Checkbox />
						<Text
							fontSize="sm"
							fontWeight="medium"
						>
							Chỉ hiển thị sự khác biệt
						</Text>
					</Flex>
				</Box>
				<Grid
					flex="1"
					border="1px solid #ccc"
					gridTemplateColumns="repeat(4,1fr)"
				>
					{items?.map((item: any, index: number) => {
						return (
							<GridItem
								key={index}
								borderLeft="1px solid #ccc"
							>
								<CardCompare item={item} />
							</GridItem>
						);
					})}

					{Array(4 - items.length)
						.fill(0)
						.map((item, index) => {
							return (
								<GridItem
									key={index}
									borderLeft="1px solid #ccc"
								>
									<Box
										display="flex"
										flexDirection="column"
										justifyContent="center"
										alignItems="center"
										h="full"
									>
										<Button
											as={Link}
											to={`/${items?.[0]?.shared_url?.split("/")?.[0]}`}
											color="black"
											bgColor="bg.gray"
											leftIcon={<PlusIcon size={4} />}
										>
											Thêm sản phẩm khác
										</Button>
									</Box>
								</GridItem>
							);
						})}
				</Grid>
			</Flex>
		</>
	);
};

export default ListCardCompare;

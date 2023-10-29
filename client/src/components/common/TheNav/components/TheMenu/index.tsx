import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import Filter from "../Filter";

type Props = {
	items?: any;
};

const TheMenu = ({ items = [] }: Props) => {
	const [active, setActive] = useState<any>({
		check: 0,
		data: items[0]?.brands,
	});

	return (
		<Flex
			w="full"
			maxH={{
				sm: "full",
				lg: "480px",
			}}
			p="5"
			gap="5"
			rounded="md"
			backgroundColor="bg.white"
			overflowX="hidden"
			overflowY="auto"
			css={{
				"&::-webkit-scrollbar": {
					width: "6px",
				},
				"&::-webkit-scrollbar-track": {
					width: "6px",
				},
				"&::-webkit-scrollbar-thumb": {
					height: "32px !important",
					borderRadius: "24px",
					backgroundColor: "#e6e6e6",
				},
			}}
			flexDirection={{
				sm: "column",
				lg: "row",
			}}
		>
			<Flex
				w={{
					sm: "full",
					lg: "200px",
				}}
				maxH={{
					sm: "200px",
					lg: "full",
				}}
				justifyContent="space-between"
				overflowX="hidden"
				overflowY="auto"
				css={{
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						width: "6px",
					},
					"&::-webkit-scrollbar-thumb": {
						height: "32px !important",
						borderRadius: "24px",
						backgroundColor: "#e6e6e6",
					},
				}}
			>
				<Flex
					gap="2"
					flex="1"
					flexDir="column"
				>
					{items?.map((item: any, index: number) => {
						return (
							<Flex
								key={index}
								w="full"
								px="3"
								py="2"
								rounded="md"
								cursor="pointer"
								alignItems="center"
								backgroundColor={index == active?.check ? "bg.gray" : "bg.white"}
								justifyContent="flex-start"
								onClick={() =>
									setActive({
										...active,
										check: index,
										category: {
											...item,
										},
										data: item.brands,
									})
								}
							>
								<Box
									w="8"
									h="8"
								>
									<Image
										w="full"
										h="full"
										objectFit="cover"
										src={item?.thumbnail}
									/>
								</Box>
								<Text
									ml="2"
									fontSize="sm"
									fontWeight="semibold"
								>
									{item?.name}
								</Text>
							</Flex>
						);
					})}
				</Flex>
				<Box
					w="2px"
					h="full"
					bgColor="bg.white"
				/>
			</Flex>
			{/* Bộ lọc */}
			<Flex
				flex="1"
				gap="5"
				overflowX="hidden"
				overflowY="auto"
				css={{
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						width: "6px",
					},
					"&::-webkit-scrollbar-thumb": {
						height: "32px !important",
						borderRadius: "24px",
						backgroundColor: "#e6e6e6",
					},
				}}
				maxH={{
					sm: "420px",
					lg: "full",
				}}
				flexDirection={{
					sm: "column",
					lg: "row",
				}}
			>
				<Filter
					items={active?.data}
					category={active?.category}
				/>
			</Flex>
		</Flex>
	);
};

export default TheMenu;

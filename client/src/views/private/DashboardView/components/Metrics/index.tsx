import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "~/components/common/Icons";
import { Grid, GridItem, Flex, Box, Center, Text, Heading } from "@chakra-ui/layout";

type Props = {};

const Metrics = (props: Props) => {
	return (
		<Grid
			mt="4"
			px="5"
			py="6"
			gap="2"
			bgColor="bg.white"
			rounded="md"
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(2, 1fr)",
				lg: "repeat(2, 1fr)",
				xl: "repeat(5, 1fr)",
				"2xl": "repeat(5, 1fr)",
			}}
		>
			<GridItem
				borderRightWidth={{
					sm: "0",
					md: "0",
					lg: "1px",
					xl: "1px",
					"2xl": "1px",
				}}
				borderBottomWidth={{
					sm: "1px",
					md: "1px",
					lg: "0",
					xl: "0",
					"2xl": "0",
				}}
				borderRightColor="#F1F4F9"
				_last={{
					borderRightWidth: 0,
					borderBottomWidth: 0,
				}}
			>
				<Center
					justifyContent={{
						sm: "flex-start",
						md: "flex-start",
						lg: "center",
						xl: "center",
						"2xl": "center",
					}}
				>
					<Box
						px="4"
						py="3"
					>
						<Flex
							gap="3"
							alignItems="center"
						>
							<Box
								w="4"
								h="4"
								rounded="sm"
								bgColor="red.200"
							/>
							<Text
								color="text.admin2"
								fontSize="sm"
								fontWeight="semibold"
							>
								Doanh Thu
							</Text>
						</Flex>
						<Heading
							as="h3"
							fontSize="2xl"
							my="2"
						>
							9.232 M
						</Heading>
						<Flex
							gap="1"
							alignItems="center"
						>
							<Flex
								w="5"
								h="5"
								alignItems="center"
								justifyContent="center"
								rounded="full"
								bgColor="rgba(26, 213, 152, 0.20)"
							>
								<ArrowUpIcon
									size={4}
									color="#1AD598"
								/>
							</Flex>
							<Text
								color="#1AD598"
								fontSize="sm"
								fontWeight="semibold"
							>
								+20,20 %
							</Text>
						</Flex>
					</Box>
				</Center>
			</GridItem>
			<GridItem
				borderRightWidth={{
					sm: "0",
					md: "0",
					lg: "1px",
					xl: "1px",
					"2xl": "1px",
				}}
				borderBottomWidth={{
					sm: "1px",
					md: "1px",
					lg: "0",
					xl: "0",
					"2xl": "0",
				}}
				borderRightColor="#F1F4F9"
				_last={{
					borderRightWidth: 0,
					borderBottomWidth: 0,
				}}
			>
				<Center
					justifyContent={{
						sm: "flex-start",
						md: "flex-start",
						lg: "center",
						xl: "center",
						"2xl": "center",
					}}
				>
					<Box
						px="4"
						py="3"
					>
						<Flex
							gap="3"
							alignItems="center"
						>
							<Box
								w="4"
								h="4"
								rounded="sm"
								bgColor="red.200"
							/>
							<Text
								color="text.admin2"
								fontSize="sm"
								fontWeight="semibold"
							>
								Doanh Thu
							</Text>
						</Flex>
						<Heading
							as="h3"
							fontSize="2xl"
							my="2"
						>
							9.232 M
						</Heading>
						<Flex
							gap="1"
							alignItems="center"
						>
							<Flex
								w="5"
								h="5"
								alignItems="center"
								justifyContent="center"
								rounded="full"
								bgColor="rgba(26, 213, 152, 0.20)"
							>
								<ArrowUpIcon
									size={4}
									color="#1AD598"
								/>
							</Flex>
							<Text
								color="#1AD598"
								fontSize="sm"
								fontWeight="semibold"
							>
								+20,20 %
							</Text>
						</Flex>
					</Box>
				</Center>
			</GridItem>
			<GridItem
				borderRightWidth={{
					sm: "0",
					md: "0",
					lg: "1px",
					xl: "1px",
					"2xl": "1px",
				}}
				borderBottomWidth={{
					sm: "1px",
					md: "1px",
					lg: "0",
					xl: "0",
					"2xl": "0",
				}}
				borderRightColor="#F1F4F9"
				_last={{
					borderRightWidth: 0,
					borderBottomWidth: 0,
				}}
			>
				<Center
					justifyContent={{
						sm: "flex-start",
						md: "flex-start",
						lg: "center",
						xl: "center",
						"2xl": "center",
					}}
				>
					<Box
						px="4"
						py="3"
					>
						<Flex
							gap="3"
							alignItems="center"
						>
							<Box
								w="4"
								h="4"
								rounded="sm"
								bgColor="red.200"
							/>
							<Text
								color="text.admin2"
								fontSize="sm"
								fontWeight="semibold"
							>
								Doanh Thu
							</Text>
						</Flex>
						<Heading
							as="h3"
							fontSize="2xl"
							my="2"
						>
							9.232 M
						</Heading>
						<Flex
							gap="1"
							alignItems="center"
						>
							<Flex
								w="5"
								h="5"
								alignItems="center"
								justifyContent="center"
								rounded="full"
								bgColor="rgba(26, 213, 152, 0.20)"
							>
								<ArrowUpIcon
									size={4}
									color="#1AD598"
								/>
							</Flex>
							<Text
								color="#1AD598"
								fontSize="sm"
								fontWeight="semibold"
							>
								+20,20 %
							</Text>
						</Flex>
					</Box>
				</Center>
			</GridItem>
			<GridItem
				borderRightWidth={{
					sm: "0",
					md: "0",
					lg: "1px",
					xl: "1px",
					"2xl": "1px",
				}}
				borderBottomWidth={{
					sm: "1px",
					md: "1px",
					lg: "0",
					xl: "0",
					"2xl": "0",
				}}
				borderRightColor="#F1F4F9"
				_last={{
					borderRightWidth: 0,
					borderBottomWidth: 0,
				}}
			>
				<Center
					justifyContent={{
						sm: "flex-start",
						md: "flex-start",
						lg: "center",
						xl: "center",
						"2xl": "center",
					}}
				>
					<Box
						px="4"
						py="3"
					>
						<Flex
							gap="3"
							alignItems="center"
						>
							<Box
								w="4"
								h="4"
								rounded="sm"
								bgColor="red.200"
							/>
							<Text
								color="text.admin2"
								fontSize="sm"
								fontWeight="semibold"
							>
								Doanh Thu
							</Text>
						</Flex>
						<Heading
							as="h3"
							fontSize="2xl"
							my="2"
						>
							9.232 M
						</Heading>
						<Flex
							gap="1"
							alignItems="center"
						>
							<Flex
								w="5"
								h="5"
								alignItems="center"
								justifyContent="center"
								rounded="full"
								bgColor="rgba(26, 213, 152, 0.20)"
							>
								<ArrowUpIcon
									size={4}
									color="#1AD598"
								/>
							</Flex>
							<Text
								color="#1AD598"
								fontSize="sm"
								fontWeight="semibold"
							>
								+20,20 %
							</Text>
						</Flex>
					</Box>
				</Center>
			</GridItem>
			<GridItem
				borderRightWidth={{
					sm: "0",
					md: "0",
					lg: "1px",
					xl: "1px",
					"2xl": "1px",
				}}
				borderBottomWidth={{
					sm: "1px",
					md: "1px",
					lg: "0",
					xl: "0",
					"2xl": "0",
				}}
				borderRightColor="#F1F4F9"
				_last={{
					borderRightWidth: 0,
					borderBottomWidth: 0,
				}}
			>
				<Center
					justifyContent={{
						sm: "flex-start",
						md: "flex-start",
						lg: "center",
						xl: "center",
						"2xl": "center",
					}}
				>
					<Box
						px="4"
						py="3"
					>
						<Flex
							gap="3"
							alignItems="center"
						>
							<Box
								w="4"
								h="4"
								rounded="sm"
								bgColor="red.200"
							/>
							<Text
								color="text.admin2"
								fontSize="sm"
								fontWeight="semibold"
							>
								Doanh Thu
							</Text>
						</Flex>
						<Heading
							as="h3"
							fontSize="2xl"
							my="2"
						>
							9.232 M
						</Heading>
						<Flex
							gap="1"
							alignItems="center"
						>
							<Flex
								w="5"
								h="5"
								alignItems="center"
								justifyContent="center"
								rounded="full"
								bgColor="rgba(26, 213, 152, 0.20)"
							>
								<ArrowUpIcon
									size={4}
									color="#1AD598"
								/>
							</Flex>
							<Text
								color="#1AD598"
								fontSize="sm"
								fontWeight="semibold"
							>
								+20,20 %
							</Text>
						</Flex>
					</Box>
				</Center>
			</GridItem>
		</Grid>
	);
};

export default Metrics;

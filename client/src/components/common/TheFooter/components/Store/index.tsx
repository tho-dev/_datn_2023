import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/layout";
import { Heading, Text, Box, Grid, GridItem, Flex } from "@chakra-ui/layout";
import { ArrowRightUpIcon } from "~/components/common/Icons";

type Props = {
	title?: string;
};

const Store = ({ title }: Props) => {
	return (
		<Box mt="6">
			<Heading
				as="h2"
				fontSize="xl"
				color="text.black"
				fontWeight="semibold"
			>
				{title}
			</Heading>
			<Grid
				mt="4"
				gap="3"
				templateColumns={{
					sm: "repeat(1, 1fr)",
					md: "repeat(2, 1fr)",
					xl: "repeat(3, 1fr)",
				}}
			>
				<GridItem>
					<Box
						p="4"
						rounded="md"
						fontSize="sm"
						color="text.black"
						backgroundColor="bg.gray"
					>
						<Text fontWeight="semibold">Thành phố Hồ Chí Minh</Text>
						<Text>Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh</Text>
						<Flex
							mt="2"
							alignItems="flex-end"
							justifyContent="space-between"
						>
							<Box fontSize="xs">
								<Text
									fontWeight="semibold"
									color="#f93920"
								>
									Đã đóng cửa, hẹn bạn 09:00 ngày mai
								</Text>
								<Text fontWeight="medium">09:00 - 21:00</Text>
							</Box>
							<Link
								as={ReactRouterLink}
								fontSize="xs"
								color="text.blue"
								fontWeight="bold"
								textDecoration="none"
							>
								Chỉ đường
								<ArrowRightUpIcon size={4} />
							</Link>
						</Flex>
					</Box>
				</GridItem>
				<GridItem>
					<Box
						p="4"
						rounded="md"
						fontSize="sm"
						color="text.black"
						backgroundColor="bg.gray"
					>
						<Text fontWeight="semibold">Thành phố Hồ Chí Minh</Text>
						<Text>Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh</Text>
						<Flex
							mt="2"
							alignItems="flex-end"
							justifyContent="space-between"
						>
							<Box fontSize="xs">
								<Text
									fontWeight="semibold"
									color="#f93920"
								>
									Đã đóng cửa, hẹn bạn 09:00 ngày mai
								</Text>
								<Text fontWeight="medium">09:00 - 21:00</Text>
							</Box>
							<Link
								as={ReactRouterLink}
								fontSize="xs"
								color="text.blue"
								fontWeight="bold"
								textDecoration="none"
							>
								Chỉ đường
								<ArrowRightUpIcon size={4} />
							</Link>
						</Flex>
					</Box>
				</GridItem>
				<GridItem>
					<Box
						p="4"
						rounded="md"
						fontSize="sm"
						color="text.black"
						backgroundColor="bg.gray"
					>
						<Text fontWeight="semibold">Thành phố Hồ Chí Minh</Text>
						<Text>Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh</Text>
						<Flex
							mt="2"
							alignItems="flex-end"
							justifyContent="space-between"
						>
							<Box fontSize="xs">
								<Text
									fontWeight="semibold"
									color="#f93920"
								>
									Đã đóng cửa, hẹn bạn 09:00 ngày mai
								</Text>
								<Text fontWeight="medium">09:00 - 21:00</Text>
							</Box>
							<Link
								as={ReactRouterLink}
								fontSize="xs"
								color="text.blue"
								fontWeight="bold"
								textDecoration="none"
							>
								Chỉ đường
								<ArrowRightUpIcon size={4} />
							</Link>
						</Flex>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default Store;

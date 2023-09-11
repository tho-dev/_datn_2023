import { Box, Grid, GridItem, Flex, Text, Button, useDisclosure, Heading, Checkbox } from "@chakra-ui/react";
import React from "react";
import CardCompare from "./CardCompare";
import { PlusIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import ListThinkPro from "~/components/ListThinkPro";

type Props = {};

const ListCardCompare = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
						So sánh 2 sản phẩm
					</Text>
					<Box mt="10px">
						<Text
							fontSize="14px"
							lineHeight={6}
							fontWeight="medium"
						>
							Dell Inspiron 16 5630
						</Text>
						<Text
							fontSize="14px"
							lineHeight={6}
							fontWeight="medium"
						>
							Dell Inspiron 16 5630
						</Text>
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
					<GridItem>
						<CardCompare />
					</GridItem>
					<GridItem borderLeft="1px solid #ccc">
						<CardCompare />
					</GridItem>
					<GridItem borderLeft="1px solid #ccc">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
							h="full"
						>
							<Button
								color="black"
								bgColor="bg.gray"
								leftIcon={<PlusIcon size={4} />}
								onClick={onOpen}
							>
								Thêm sản phẩm khác
							</Button>
						</Box>
					</GridItem>
					<GridItem borderLeft="1px solid #ccc">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
							h="full"
							onClick={onOpen}
						>
							<Button
								color="black"
								bgColor="bg.gray"
								leftIcon={<PlusIcon size={4} />}
							>
								Thêm sản phẩm khác
							</Button>
						</Box>
					</GridItem>
				</Grid>
			</Flex>

			{/* Thêm sản phẩm so sánh */}
			<DialogThinkPro
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				size="3xl"
				title={
					<Heading
						fontSize="xl"
						fontWeight="bold"
					>
						Thêm sản phẩm so sánh
					</Heading>
				}
			>
				<Box
					bgColor="bg.gray"
					px="4"
					py="6"
					w="calc(100% + 48px)"
					mx="-6"
				>
					<ListThinkPro columns="3" />
				</Box>
			</DialogThinkPro>
		</>
	);
};

export default ListCardCompare;

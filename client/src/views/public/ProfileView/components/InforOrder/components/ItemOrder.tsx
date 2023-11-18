import React from "react";
import { Box, Divider, Flex, TabPanel, Text, Tag, useDisclosure, Button } from "@chakra-ui/react";
import ItemCart from "./ItemCart";

type Props = {
	item: any;
	handleOpenModelReturn: (order: any) => void;
	handleOpenModelCancel: (order: any) => void;
	handleConfirmCompleted: (order: any) => void;
	handleOrderDetail: (order: any) => void;
};

const ItemOrder = ({
	item,
	handleOpenModelReturn,
	handleOpenModelCancel,
	handleConfirmCompleted,
	handleOrderDetail,
}: Props) => {
	const currentDate = new Date();
	const targetTime = new Date(item.created_at);
	targetTime.setMinutes(targetTime.getMinutes() + 15);

	const targetTimeReturn = new Date(item?.updated_at);

	targetTimeReturn.setDate(targetTimeReturn.getDate() + 1);
	return (
		<Box
			p="6"
			my={4}
			rounded="xl"
			backgroundColor="bg.gray"
		>
			<Flex justifyContent="space-between">
				<Text
					fontSize="14px"
					fontWeight={"bold"}
				>
					Mã đơn hàng:
					<Text
						as={"span"}
						fontSize="14px"
					>
						{item._id}
					</Text>
				</Text>
				<Tag
					fontSize="10px"
					fontWeight="bold"
					textTransform={"uppercase"}
					color="text.textDelete"
					bgColor="bg.bgDelete"
					rounded="md"
				>
					{item.status}
				</Tag>
			</Flex>
			<Divider my="1" />
			<Box>
				<ItemCart product={item?.new_order_details[0]} />
			</Box>
			<Divider />
			<Flex
				justifyContent="space-between"
				alignItems="center"
				mt={2}
			>
				<Flex gap={4}>
					{item.status == "processing" && currentDate < targetTime && (
						<Button
							fontWeight={"600"}
							type="button"
							bgColor="bg.bgDelete"
							color="text.textDelete"
							h="40px"
							fontSize="13px"
							rounded="md"
							onClick={() => handleOpenModelCancel(item)}
						>
							Huỷ đơn
						</Button>
					)}

					<Button
						fontWeight={"600 "}
						bgColor="bg.bgSuccess"
						color="text.textSuccess"
						h="40px"
						fontSize="13px"
						rounded="md"
						onClick={() => handleOrderDetail(item)}
					>
						Chi tiết
					</Button>
					{item.status == "delivered" && currentDate < targetTimeReturn && (
						<Button
							size={"sm"}
							onClick={() => handleOpenModelReturn(item)}
						>
							Hoàn hàng
						</Button>
					)}
					{item.status == "pendingComplete" && (
						<Button
							bgColor="bg.green"
							size={"sm"}
							onClick={() => handleConfirmCompleted(item)}
						>
							Đã nhận hàng
						</Button>
					)}
				</Flex>
				<Text
					fontSize="14px"
					fontWeight="bold"
				>
					Thành tiền:{item?.total_amount.toLocaleString()}đ
				</Text>
			</Flex>
		</Box>
	);
};

export default ItemOrder;

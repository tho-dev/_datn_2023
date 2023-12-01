import { Box, Divider, Flex, Text, Button } from "@chakra-ui/react";
import ItemCart from "./ItemCart";
import { checkOrderStatus, formatNumber } from "~/utils/fc";

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
			py="6"
			px="4"
			rounded="xl"
			borderWidth="1px"
			borderColor="#eef1f6"
			boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
		>
			<Flex justifyContent="space-between">
				<Text
					fontSize="12px"
					fontWeight={"bold"}
				>
					Mã đơn hàng: #{item._id}
				</Text>

				<Text
					py="1"
					px="4"
					fontSize="11px"
					fontWeight="semibold"
					display="inline-block"
					rounded="4px"
					bg={checkOrderStatus(item.status as string)?.background}
					color={checkOrderStatus(item.status as string)?.color}
				>
					{checkOrderStatus(item.status as string)?.status}
				</Text>
			</Flex>
			<Divider my="1" />
			{item?.new_order_details?.map((z: any, k: any) => {
				return (
					<Flex
						key={k}
						alignItems="center"
						justifyContent="space-between"
					>
						<ItemCart product={z} />
						<Box>
							<Text
								fontSize="12px"
								fontWeight="black"
							>
								{formatNumber(`${z?.price}`)}
							</Text>
							<Text
								color="text.textDelete"
								fontSize="12px"
								fontWeight="black"
								textAlign="right"
							>
								x{z?.quantity}
							</Text>
							<Text
								fontSize="12px"
								fontWeight="black"
							>
								{formatNumber(`${z?.total_money}`)}
							</Text>
						</Box>
					</Flex>
				);
			})}
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
							h="36px"
							fontSize="12px"
							rounded="5px"
							onClick={() => handleOpenModelCancel(item)}
						>
							Huỷ đơn
						</Button>
					)}

					<Button
						fontWeight={"600 "}
						bgColor="bg.bgEdit"
						color="text.textEdit"
						h="36px"
						fontSize="12px"
						rounded="5px"
						onClick={() => handleOrderDetail(item)}
					>
						Chi tiết
					</Button>
					{item.status == "delivered" && currentDate < targetTimeReturn && (
						<Button
							fontWeight={"600 "}
							bgColor="bg.bgSuccess"
							color="text.textSuccess"
							h="36px"
							fontSize="12px"
							rounded="5px"
							onClick={() => handleOpenModelReturn(item)}
						>
							Hoàn hàng
						</Button>
					)}
					{item.status == "pendingComplete" && (
						<Button
							fontWeight={"600 "}
							bgColor="bg.bgSuccess"
							color="text.textSuccess"
							h="36px"
							fontSize="12px"
							rounded="5px"
							onClick={() => handleConfirmCompleted(item)}
						>
							Đã nhận hàng
						</Button>
					)}
				</Flex>
				<Text
					fontSize="13px"
					fontWeight="semibold"
				>
					Thành tiền: {formatNumber(`${item?.total_amount}`)} VND
				</Text>
			</Flex>
		</Box>
	);
};

export default ItemOrder;

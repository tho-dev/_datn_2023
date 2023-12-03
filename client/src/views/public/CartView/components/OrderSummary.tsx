import { Box, Flex } from "@chakra-ui/layout";
import { Text, Button } from "@chakra-ui/react";
import { formatNumber } from "~/utils/fc";

type Props = {
	data: any;
	handlePayment: () => void;
};

const OrderSummary = ({ handlePayment, data }: Props) => {
	const caculate_discount = (data: any[]) => {
		if (!data) return 0;
		const discount = data.reduce((acc, val) => {
			return acc + (val.price_before_discount - val.price) * val.quantity;
		}, 0);
		return discount;
	};

	return (
		<Box>
			<Text
				as={"h5"}
				fontSize={"18px"}
				fontWeight={"600"}
				lineHeight={"27px"}
			>
				Tóm tắt đơn hàng
			</Text>
			<Flex
				py={"4"}
				borderBottomColor={"border.primary"}
				borderBottomWidth={"1px"}
				borderStyle="dashed"
				justifyContent={"space-between"}
			>
				<Box
					as={"p"}
					fontSize={"13px"}
					fontWeight="semibold"
				>
					Tích kiệm:
				</Box>
				<Box
					as={"p"}
					fontSize={"12px"}
					lineHeight={"18px"}
					fontWeight={"600"}
				>
					{formatNumber(`${caculate_discount(data.products) || 0}`)}đ
				</Box>
			</Flex>
			<Flex
				py={"4"}
				alignItems="flex-end"
				justifyContent={"space-between"}
			>
				<Box
					as={"p"}
					fontSize={"sm"}
					// lineHeight={"18px"}
					fontWeight="semibold"
				>
					Tổng cộng:
				</Box>
				<Box
					as={"p"}
					fontSize={"lg"}
					color={"#FE3464"}
					fontWeight={"semibold"}
				>
					{data ? formatNumber(`${data.total_money}`) : 0}đ
				</Box>
			</Flex>
			<Button
				w={"full"}
				fontSize={"md"}
				fontWeight={"600"}
				onClick={handlePayment}
				_hover={{ bg: "bg.red" }}
				bgColor={data.products.length <= 0 ? "bg.darkGray" : "bg.red"}
			>
				Mua Ngay
			</Button>
		</Box>
	);
};

export default OrderSummary;

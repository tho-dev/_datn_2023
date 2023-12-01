import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

type Props = {
	data: any;
	transport_fee: number;
	voucher_value: number;
};

const PaySummary = ({ data, transport_fee, voucher_value }: Props) => {
	return (
		<Box>
			<Text
				as={"h5"}
				fontSize={"18px"}
				fontWeight={"bold"}
				lineHeight={"27px"}
			>
				Tóm tắt đơn hàng
			</Text>
			<Flex
				justifyContent={"space-between"}
				py={"16px"}
			>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight="semibold"
				>
					Tạm tính:
				</Box>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight={600}
				>
					{data?.total_money.toLocaleString()}đ
				</Box>
			</Flex>
			<Flex
				justifyContent={"space-between"}
				pb={"16px"}
				borderColor="border.primary"
			>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight="semibold"
				>
					Vận chuyển:
				</Box>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight={600}
				>
					{transport_fee?.toLocaleString()}đ
				</Box>
			</Flex>
			<Flex
				justifyContent={"space-between"}
				pb={"16px"}
				borderBottom={"dashed 1px"}
				borderColor="border.primary"
			>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight="semibold"
				>
					Giảm giá:
				</Box>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight={600}
				>
					{voucher_value?.toLocaleString()}đ
				</Box>
			</Flex>
			<Flex
				justifyContent={"space-between"}
				py={"4"}
			>
				<Box
					as={"p"}
					fontSize={"13px"}
					lineHeight={"18px"}
					fontWeight="semibold"
				>
					Tổng cộng:
				</Box>
				<Box
					as={"p"}
					fontSize={"xl"}
					color={"#FE3464"}
					fontWeight={"semibold"}
				>
					{(data.total_money + transport_fee - voucher_value)?.toLocaleString()}đ
				</Box>
			</Flex>
		</Box>
	);
};

export default PaySummary;

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";

type Props = {};

const PaySummary = (props: Props) => {
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
				justifyContent={"space-between"}
				py={"16px"}
			>
				<Box
					as={"p"}
					fontSize={"xs"}
					lineHeight={"18px"}
					fontWeight="medium"
				>
					Tạm tính:
				</Box>
				<Box
					as={"p"}
					fontSize={"12px"}
					lineHeight={"18px"}
					fontWeight={600}
				>
					9.300.000
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
					fontSize={"12px"}
					lineHeight={"18px"}
					fontWeight="medium"
				>
					Vận chuyển:
				</Box>
				<Box
					as={"p"}
					fontSize={"xs"}
					lineHeight={"18px"}
					fontWeight={600}
				>
					0
				</Box>
			</Flex>
			<Flex
				justifyContent={"space-between"}
				py={"4"}
			>
				<Box
					as={"p"}
					fontSize={"sm"}
					lineHeight={"18px"}
					fontWeight="medium"
				>
					Tổng cộng:
				</Box>
				<Box
					as={"p"}
					fontSize={"xl"}
					color={"#FE3464"}
					fontWeight={"semibold"}
				>
					19.190.000
				</Box>
			</Flex>
			<Button
				w={"full"}
				fontSize={"16px"}
				fontWeight={"600 "}
			>
				Mua Ngay
			</Button>
		</Box>
	);
};

export default PaySummary;
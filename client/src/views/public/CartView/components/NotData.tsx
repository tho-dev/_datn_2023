import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import { CartNotFoundIcon } from "~/components/common/Icons";

type Props = {};

const NotData = (props: Props) => {
	return (
		<>
			<Box textAlign={"center"}>
				<CartNotFoundIcon />
				<Text fontSize={"18px"} lineHeight={"150%"} fontWeight={600} my={"12px"}>
					Giỏ hàng trống{" "}
				</Text>
				<Text fontSize={"14px"} lineHeight={"150%"}>
					Hãy thoải mái lựa sản phẩm bạn nhé.
				</Text>
			</Box>
			<Flex justifyContent={"center"}>
				<Button my={"24px"} bg={"blue.500"} fontSize={"16px"}>
					Khám phá ngay
				</Button>
			</Flex>
		</>
	);
};

export default NotData;
